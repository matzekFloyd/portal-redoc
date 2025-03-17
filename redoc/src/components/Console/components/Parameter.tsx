import * as React from 'react';
import { FieldModel } from '../../../services';
import { ParameterType } from '../types';

export function Parameter(props: {
  parameter: FieldModel;
  setParameter: (type: ParameterType | undefined, name, value) => void;
  paramByOperation: (type: ParameterType | undefined, paramName) => string;
}) {
  const parameter = props.parameter;
  const setParameter = props.setParameter;
  const paramByOperation = props.paramByOperation;

  let content: JSX.Element;
  if (parameter.schema.type === 'boolean') {
    content = (
      <li className={'mb-3'}>
        <label className={'col-form-label label-style'}>
          {parameter.name}
          <span className={'required'}>{parameter.required ? ' (required)' : ''}</span>
        </label>
        <select
          className={'form-select form-select-sm style-input'}
          name={'select-boolean'}
          defaultValue={''}
          onChange={(ev) => setParameter(parameter.in, parameter.name, ev.target.value)}
        >
          <option value={''} disabled={parameter.required}>
            --
          </option>
          <option value={'true'}>true</option>
          <option value={'false'}>false</option>
        </select>
        <small className={'small-text'}>{parameter.description}</small>
      </li>
    );
  } else if (parameter.schema.enum.length > 0) {
    content = (
      <li className={'mb-3'}>
        <label className={'col-form-label label-style'}>
          {parameter.name}
          <span className={'required'}>{parameter.required ? ' (required)' : ''}</span>
        </label>
        <select
          className={'form-select form-select-sm style-input'}
          name={'select-boolean'}
          defaultValue={''}
          onChange={(ev) => setParameter(parameter.in, parameter.name, ev.target.value)}
        >
          <option value={''} disabled={parameter.required}>
            --
          </option>
          {parameter.schema.enum.map((item, index) => {
            return item ? (
              <option value={item} key={index}>
                {item}
              </option>
            ) : null;
          })}
        </select>
        <small className={'small-text'}>{parameter.description}</small>
      </li>
    );
  } else {
    content = (
      <li className={'mb-3'}>
        <label className={'col-form-label label-style'}>
          {parameter.name}
          <span className={'required'}>{parameter.required ? ' (required)' : ''}</span>
        </label>
        <input
          type="text"
          className={'form-control'}
          name={parameter.name}
          value={paramByOperation(parameter.in, parameter.name)}
          required={parameter.required}
          onChange={(ev) => setParameter(parameter.in, parameter.name, ev.target.value)}
        />
        <small className={'small-text'}>{parameter.description}</small>
      </li>
    );
  }

  return content;
}
