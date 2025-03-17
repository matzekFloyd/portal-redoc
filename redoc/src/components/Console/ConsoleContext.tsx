import * as React from 'react';

export interface ConsoleContextObject {
  showConsole: boolean,
  toggleConsole: (value?: boolean) => void,
  getOperationParameterValues: (operationId: string | undefined) => any,
  storeOperationParameterValues
}

export const ConsoleContext = React.createContext({
  showConsole: false,
  toggleConsole: () => {},
  getOperationParameterValues: (_operationId: string) => ({}),
  storeOperationParameterValues: (_operationId: string, _parameterValues: any) => {}
});

export const ConsoleContextProvider = ConsoleContext.Provider;
