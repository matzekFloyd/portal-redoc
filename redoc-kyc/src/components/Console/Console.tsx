import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { observe } from 'mobx';
import { ClipboardService, MenuStore, OperationModel } from '../../services';
import { ConsoleContext, ConsoleContextObject } from './ConsoleContext';
import { fetchToCurl } from './fetchToCurl';
import { Tooltip } from '../../common-elements/Tooltip';
import { Loading } from '../Loading/Loading';
import ConsoleStyle from './components/ConsoleStyle';
import {
  ENV,
  getPathAndQuery,
  getUrl,
  tryParse,
  valuesWithoutOperationPrefix,
  filterByOperationId,
} from './consoleHelpers';
import { ApplicationsAsOptions } from './components/ApplicationsAsOptions';
import { UserKeysAsOptions } from './components/UserKeysAsOptions';
import { RequestBodyFields } from './components/RequestBodyFields';
import { Parameter } from './components/Parameter';
import { ParameterType, ParameterValues } from './types';

export interface ConsoleStyleProps {
  fullWidth?: boolean;
  operation?: OperationModel;
}

export interface ConsoleProps extends ConsoleStyleProps {
  menu: MenuStore;
}

export function Console({ menu }) {
  const context = useContext(ConsoleContext) as ConsoleContextObject;
  const tryOutFullWidth = true;
  const [processing, setProcessing] = useState(false);
  const [apiResponse, setResponse] = useState<{
    text?: string;
    html?: string;
    json?: string;
  } | null>(null);
  const [requestUrl, setRequestUrl] = useState('');
  const [responseCode, setResponseCode] = useState();
  const [requestHeaders, setRequestHeaders] = useState([] as any);
  const [height, setHeight] = useState(0);
  const [operation, setOperation] = useState<OperationModel | null>(null);
  const [applications, setApplications] = useState<{ applications: any[] }>({ applications: [] });
  const [userAppKey, setUserKey] = useState('');
  const [curlRequest, setCurlRequest] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltipResponse, setShowTooltipResponse] = useState(false);
  const [parameterValues, setParameterValues] = useState<ParameterValues | {}>(
    context.getOperationParameterValues(operation?.operationId as any),
  );
  const [show, setShow] = useState(false);
  const [internalUserKeys, setInternalUserKeys] = useState([]);
  const [userHasCCFeature, setUserHasCCFeature] = useState(false);
  const [mimeTypes, setMimeTypes] = useState<string[]>([]);
  const [pdfHeader, setPdfHeader] = useState(false);

  useEffect(() => {
    (async function () {
      const URL = ENV + '/kycapi/user/threescale/getUserApplications';
      const response = await fetch(URL, { credentials: 'include' });
      if (response.status === 200) {
        const response_json = await response.json();
        setApplications(response_json);
      }
      const getDefaultAppUrl = ENV + `/user/threescale/getUsersDefaultKycApiPlan`;
      const default_app = await fetch(getDefaultAppUrl, { credentials: 'include' });
      if (default_app.status === 200) {
        const default_app_json = await default_app.json();
        if (default_app_json.application !== null) {
          setUserKey(default_app_json.application.userKey);
        }
      }
      const getInternalUserKeysUrl = ENV + `/kycapi/user/getDefaultUserKeysForInternalUse`;
      const response_keys = await fetch(getInternalUserKeysUrl, { credentials: 'include' });
      if (response_keys.status === 200) {
        const defaultUserKeys = await response_keys.json();
        setInternalUserKeys(defaultUserKeys.userKeys);
        setUserHasCCFeature(defaultUserKeys.userHasCCFeature);
      }
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = observe(menu, 'activeItemIdx', (change) => {
      const item = menu.flatItems[change.newValue as number];
      if (item instanceof OperationModel) {
        setOperation(item as OperationModel);
        try {
          const types = Object.keys(
            JSON.parse(JSON.stringify(item['operationSpec']['responses']['200']['content'])),
          );
          setMimeTypes(types);
          if (types.length === 1 && types.includes('application/pdf')) {
            setPdfHeader(true);
          } else {
            setPdfHeader(false);
          }
        } catch {
          setMimeTypes([]);
          setPdfHeader(false);
        }
      }
    });
    return () => unsubscribe();
  }, [menu]);

  const setParameter = (type: ParameterType, name, value) => {
    const newValues = {
      ...parameterValues,
      [type]: {
        ...parameterValues[type],
        [`${operation?.operationId}-${name}`]: value,
      },
    };
    setParameterValues(newValues);
    context.storeOperationParameterValues(operation?.operationId, newValues);
  };

  const updateState = (input) => {
    setUserKey(input);
  };

  const isEmpty = (input) => {
    const type = typeof input;
    if (type === 'string') {
      return input.trim() === '';
    }
    if (type === 'object') {
      return Object.keys(input).length === 0;
    }
    if (Array.isArray(input)) {
      return input.length === 0;
    }
    return input === undefined || input === null;
  };

  const validateValues = (
    input,
    paramType: string | null = null,
    itemType: string | null = null,
  ) => {
    const inputType = typeof input;
    if (paramType === 'object' && inputType === 'object') {
      const result = {};
      Object.entries(input).forEach(([key, value]) => {
        const validatedValue = validateValues(value, itemType);
        if (!isEmpty(validatedValue)) {
          result[key] = validatedValue;
        }
      });
      return result;
    }
    if (paramType === 'array' && Array.isArray(input)) {
      return input.reduce((acc, value) => {
        const validatedValue = validateValues(value, itemType);
        if (!isEmpty(validatedValue)) {
          acc.push(validatedValue);
        }
        return acc;
      }, []);
    }
    if (paramType === 'string' || inputType === 'string') {
      return String(input).trim();
    }
    return input;
  };

  const execute = async () => {
    if (processing || !operation) {
      return;
    }
    setProcessing(true);

    // @ts-ignore
    let input = document?.getElementById('type_user_key')?.value;
    if (input) {
      updateState(input);
    }

    const baseUrl = getUrl();

    const requestURL = getPathAndQuery(
      `${baseUrl}${operation.path}`,
      (parameterValues as ParameterValues).path,
      (parameterValues as ParameterValues).query,
      operation.operationId,
    );
    setRequestUrl(requestURL);

    const myHeaders = new Headers();
    myHeaders.append('user_key', userAppKey);
    let requestOptions: RequestInit = {
      method: operation.httpVerb,
      headers: myHeaders,
      redirect: 'follow',
    };
    let element = {};
    if (operation.requestBody) {
      const mediaType = operation?.requestBody?.content?.mediaTypes[0]?.name;
      myHeaders.append(
        'Content-Type',
        mediaType ? mediaType : 'application/x-www-form-urlencoded;charset=UTF-8',
      );

      operation?.requestBody?.content?.mediaTypes[0]?.schema?.fields?.forEach((parameter) => {
        let value = paramByOperation('body', parameter.name);
        let valueParsed = tryParse(value).value;
        const type = parameter.schema.type;
        const itemType = parameter.schema.items?.type;
        valueParsed = validateValues(valueParsed, type, itemType);

        if (!isEmpty(valueParsed)) {
          element = { ...element, [parameter.name]: valueParsed };
        }
      });

      let formData;
      if (mediaType?.includes('json')) {
        formData = JSON.stringify(element);
      } else {
        formData = Object.keys(element)
          .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(element[key]))
          .join('&');
      }
      const addHeader = { body: formData };
      requestOptions = { ...requestOptions, ...addHeader };
    }

    if ((parameterValues as ParameterValues)?.header) {
      const headerParams = valuesWithoutOperationPrefix(
        operation.operationId,
        (parameterValues as ParameterValues).header,
      );

      Object.entries(headerParams).forEach(([key, value]: [string, string]) => {
        myHeaders.append(key, value);
      });
    }

    if (!myHeaders.get('Accept')) {
      if (pdfHeader) {
        myHeaders.append('Accept', ' application/pdf');
      } else {
        myHeaders.append('Accept', ' application/json');
      }
    }

    const res = await fetch(requestURL, requestOptions);
    let shouldHideUserKey = false;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (applications?.applications && applications?.applications[0]?.shouldHideUserKey) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      shouldHideUserKey = applications.applications[0].shouldHideUserKey;
    }
    const curl = fetchToCurl(requestURL, requestOptions, shouldHideUserKey);
    setCurlRequest(curl);

    const req_headers = [['cache-control', res.headers.get('Cache-Control')]];
    setRequestHeaders([req_headers]);
    if (res.headers.get('content-type') !== 'application/json') {
      const blob_result = await res.blob();
      if (res.status === 200) {
        let url = window.URL || window.webkitURL;
        const objectURL = url.createObjectURL(blob_result);
        let html = `<a href="${objectURL}" target="_blank">Click here to download the pdf</a>`;
        setResponse({ html });
      } else {
        let text = await blob_result.text();
        setResponse({ text });
      }
    } else {
      const json_result = await res.json();
      setResponse({ json: json_result });
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setResponseCode(res.status);

    const height_wrap_console =
      document.querySelector('.wrap-console')?.parentElement?.clientHeight;
    const text_part = document?.querySelector('.text-part')?.clientHeight;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let final_height = height_wrap_console - text_part - 80;
    if (final_height <= 200) {
      final_height = 200;
    }
    setHeight(final_height);
    setProcessing(false);
  };

  const clear = (execute_console = false) => {
    if (execute_console) {
      context.toggleConsole(false);
    }
    setResponse(null);

    if (operation?.operationId) {
      const withoutClearedValues = filterByOperationId(parameterValues, operation.operationId);
      setParameterValues(withoutClearedValues);
      context.storeOperationParameterValues(operation.operationId, withoutClearedValues);
    }
  };

  const handleChange = (e) => {
    if (e.target.value === 'addNewKey') {
      // @ts-ignore
      const select = document.getElementById('choose_plan')[0];
      // @ts-ignore
      const input = document.createElement('input');
      input.name = 'type_user_key';
      input.id = 'type_user_key';
      input.type = 'text';
      select?.parentNode?.replaceWith(input);
      input.focus();
      input.addEventListener('change', (_) => {
        setUserKey(input.value);
      });
    } else {
      setUserKey(e.target.value);
      setShow(true);
    }
  };

  const copyCodeToClipboard = (text, tooltip) => {
    const textField = document.createElement('textarea');
    textField.value = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    if (tooltip === 1) {
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
      }, 1500);
    } else if (tooltip === 2) {
      setShowTooltipResponse(true);
      setTimeout(() => {
        setShowTooltipResponse(false);
      }, 1500);
    }
    textField.remove();
  };

  const closeAction = () => {
    setShow(false);
  };

  const paramByOperation = (type: ParameterType, paramName) => {
    if (!parameterValues[type]) parameterValues[type] = {};
    return parameterValues[type][`${operation?.operationId}-${paramName}`] || '';
  };

  if (!context.showConsole) {
    return null;
  }

  if (!operation) {
    const id = window.location.hash;
    if (id) {
      const item = menu.getItemById(id.slice(1));
      if (item instanceof OperationModel) {
        setOperation(item as OperationModel);
      }
    }
  }

  if (!operation) {
    return (
      <ConsoleStyle fullWidth={tryOutFullWidth} className="try-console-holder">
        <div className={'upper-part col-6'}>
          <p
            className={'navigation-page-right mb-50'}
            style={{ cursor: 'pointer' }}
            onClick={() => clear(true)}
          >
            SEE DOCUMENTATION
          </p>
          <h5>Choose an endpoint</h5>
        </div>
      </ConsoleStyle>
    );
  }

  return (
    <>
      <ConsoleStyle fullWidth={tryOutFullWidth} operation={operation} className="try-console-holder">
        <div className={'wrap-console'}>
          <div className={'upper-part d-inline-block col-6'}>
            <div className={'small-service-message ' + (show ? 'd-block ' : 'd-none ')}>
              <div
                className={
                  'service-message alert alert-warning alert-dismissible fade show mt-2 mb-4 d-block col-6'
                }
              >
                <span>Querying against this plan may incur charges!</span>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  onClick={closeAction}
                />
              </div>
            </div>
            <div className={'request-head'}>
              <p
                className={'navigation-page-right mb-50'}
                style={{ cursor: 'pointer' }}
                onClick={() => clear(true)}
              >
                SEE DOCUMENTATION
              </p>
              <h3 className={'oper-name mb-16'}>{operation.name}</h3>
              <h4 className={'mb-8'}>{operation.path}</h4>
              <p className={'mb-20'} dangerouslySetInnerHTML={{ __html: operation.description! }} />
              <label className={'col-form-label label-style'}>plan:</label>
              <select
                className={'form-select form-select-sm style-input'}
                style={{ color: '#005EFF', fontWeight: 600 }}
                name="choose_plan"
                id="choose_plan"
                defaultValue={userAppKey ? userAppKey : 'DEFAULT'}
                onChange={handleChange}
              >
                <option value={'DEFAULT'} disabled>
                  Choose a plan
                </option>
                <ApplicationsAsOptions applications={applications?.applications} />
                <UserKeysAsOptions userKeys={internalUserKeys} />
                {userHasCCFeature ? <option value={'addNewKey'}>Add new key</option> : null}
              </select>
              <small className={'small-text d-block mb-20'}>
                Select the plan you wish to query against or set a default plan{' '}
                <a
                  href={'/kycapi/console-v2'}
                  style={{ color: '#AFB0AF', textDecoration: 'underline' }}
                >
                  here
                </a>
              </small>
              {mimeTypes.length == 2 && (
                <>
                  <label className={'col-form-label label-style'}>accept header:</label>
                  <select
                    className={'form-select form-select-sm style-input'}
                    style={{ color: '#005EFF', fontWeight: 600 }}
                    name="choose_mime_type"
                    id="choose_mime_type"
                    onChange={(e) => {
                      setPdfHeader(e.target.value === 'pdf');
                    }}
                  >
                    <option value={'json'}>application/json</option>
                    <option value={'pdf'}>application/pdf</option>
                  </select>
                  <small className={'small-text d-block mb-20'}>
                    The type of content to be present in the response
                  </small>
                </>
              )}
              <ul>
                {operation.parameters.map((parameter, index) => {
                  return (
                    <Parameter
                      key={`${index}-${parameter.name}`}
                      parameter={parameter}
                      setParameter={setParameter}
                      paramByOperation={paramByOperation}
                    />
                  );
                })}
              </ul>
            </div>
            {operation.requestBody && (
              <div className={'request-body'}>
                <p>Request body</p>
                <RequestBodyFields
                  paramByOperation={paramByOperation}
                  setParameter={setParameter}
                  fields={operation?.requestBody?.content?.mediaTypes[0]?.schema?.fields}
                />
              </div>
            )}
            <button
              id={`btn-${operation.operationId}-try-it`}
              className={'btn btn-sm btn-primary' + (processing ? ' disabled' : '')}
              onClick={() => execute()}
            >
              Try it
            </button>
            <button
              className={'btn btn-sm btn--white ms-2' + (processing ? ' disabled' : '')}
              onClick={() => clear()}
            >
              Clear
            </button>
          </div>
          <div className={'whole-response d-inline-block col-6'}>
            {processing && <Loading color={'#FFF'} />}
            {apiResponse && !processing && (
              <>
                <div className={'text-part'}>
                  <p>Curl</p>
                  <div className={'console-code mb-3'}>
                    <div
                      className={'copy-icon pe-3'}
                      onClick={() => copyCodeToClipboard(curlRequest, 1)}
                    >
                      <Tooltip
                        title={
                          ClipboardService.isSupported()
                            ? 'Copied'
                            : 'Not supported in your browser'
                        }
                        open={showTooltip}
                      />
                    </div>
                    {curlRequest}
                  </div>
                  <p>Request url: {requestUrl}</p>
                  <p>Status code: {responseCode}</p>
                  <p>Response headers:</p>
                  <div className={'console-code mb-3'}>
                    <ul>
                      {Object.entries(requestHeaders[0]).map((key, value) => {
                        let content;
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const keyIdxOne = key[1][1];
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const keyIdxZero = key[1][0];

                        if (keyIdxOne === null) {
                          content = null;
                        } else {
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          const p = (
                            <>
                              {keyIdxZero} : {keyIdxOne}
                            </>
                          );
                          content = (
                            <li key={value}>
                              <p>{p}</p>
                            </li>
                          );
                        }
                        return content;
                      })}
                    </ul>
                  </div>
                  <p>Response body:</p>
                </div>
                <div className={'response'}>
                  {apiResponse.html ? null : (
                    <div
                      className={'copy-icon pe-3'}
                      onClick={() =>
                        copyCodeToClipboard(
                          apiResponse.json
                            ? JSON.stringify(apiResponse.json, undefined, 2)
                            : apiResponse.text,
                          2,
                        )
                      }
                    />
                  )}
                  <Tooltip
                    title={
                      ClipboardService.isSupported() ? 'Copied' : 'Not supported in your browser'
                    }
                    open={showTooltipResponse}
                  />
                </div>
                <div className={'console-code overflow'} style={{ height: height }}>
                  {apiResponse.html ? (
                    <pre dangerouslySetInnerHTML={{ __html: apiResponse.html }}></pre>
                  ) : (
                    <pre>
                      {apiResponse.json
                        ? JSON.stringify(apiResponse.json, undefined, 2)
                        : apiResponse.text}
                    </pre>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </ConsoleStyle>
    </>
  );
}
