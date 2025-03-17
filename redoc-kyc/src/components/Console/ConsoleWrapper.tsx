import * as React from 'react';
import {useState} from 'react';
import {ConsoleContextProvider} from './ConsoleContext';

export function ConsoleWrapper({children}) {
  const openByDefault = location.search === '?console';
  const [showConsole, setShowConsole] = useState(openByDefault);
  const [operationParameterValues, setOperationParameterValues] = useState({});
  function getOperationParameterValues(operationId) {
    return operationParameterValues[operationId] || {};
  }
  function storeOperationParameterValues(operationId, parameterValues) {
    setOperationParameterValues({
      ...operationParameterValues, [operationId]: parameterValues
    });
  }
  return <ConsoleContextProvider value={{
    showConsole,
    toggleConsole: (open?: boolean) => open === undefined ? setShowConsole(!showConsole) : setShowConsole(open),
    getOperationParameterValues,
    storeOperationParameterValues,
  }}>{children}</ConsoleContextProvider>;
}


