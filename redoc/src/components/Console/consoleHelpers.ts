import { ParameterValues } from "./types";

export const tryParse = (valueToParse: any) => {
  if (typeof valueToParse !== 'string') {
    return { value: valueToParse, valid: false };
  }
  try {
    const parsedValue = JSON.parse(valueToParse, (_, value) => {
      if (value === 'true' || value === 'false') {
        return value === 'true';
      }
      return value;
    });

    return { value: parsedValue, valid: true };
  } catch (e) {
    return { value: valueToParse, valid: false };
  }
};

export const valuesWithoutOperationPrefix = (operationId, values) => {
  if (!values) return {};
  const valuesWithoutOperationPrefix = {};
  Object.entries(values).forEach(([key, value]) => {
    if (`${key}`.includes(`${operationId}-`)) {
      valuesWithoutOperationPrefix[`${key}`.replace(`${operationId}-`, '')] = value;
    }
  });
  return valuesWithoutOperationPrefix;
};

export const getPathAndQuery = (originalPath, pathParams, queryParams, operationId) => {
  const pathParamsClone = Object.assign({}, valuesWithoutOperationPrefix(operationId, pathParams));
  const queryParamsClone = Object.assign(
    {},
    valuesWithoutOperationPrefix(operationId, queryParams),
  );

  const replacer = (match, name) => {
    if (pathParamsClone[name] === null || pathParamsClone[name] === undefined) {
      return match;
    }
    const value = pathParamsClone[name];
    delete pathParamsClone[name];
    return encodeURIComponent(value);
  };

  const path = originalPath.replace(/\{([^}]+)\}/g, replacer);

  let query = '';

  query = Object.entries(queryParamsClone)
    .filter(([_, value]: [string, string]) => value.trim() !== '')
    .map(([key, value]: [string, string]) => {
      return `${key}=${encodeURIComponent(value)}`;
    })
    .join('&');

  return `${path}${query && `?${query}`}`;
};

/**
 * Removes all parameter values containing provided operationId.
 */
export const filterByOperationId = (
  parameterValues: ParameterValues | {},
  operationId: string
): ParameterValues | {} => {
  const result = {};
  for (const type of Object.keys(parameterValues)) {
    const filtered = {};
    for (const [parameterKey, parameterValue] of Object.entries(parameterValues[type])) {
      if (operationId && !parameterKey.includes(operationId)) {
        filtered[parameterKey] = parameterValue;
      }
    }
    result[type] = filtered;
  }
  return result;
}

export const getUrl = () => {
  if (
    location.hostname.includes('beta') ||
    location.hostname.includes('localhost') ||
    location.hostname.includes('staging')
  ) {
    return 'https://apitest.kompany.com';
  } else {
    return 'https://api.kompany.com';
  }
};

export const ENV = location.hostname.includes('localhost')
  ? `http://${location.hostname}:8085`
  : `//${location.hostname}`;
