import * as React from 'react';
import {useContext} from 'react';
import {ConsoleContext, ConsoleContextObject} from './ConsoleContext';


export function ConsoleToggle({operation}) {
  const context = useContext(ConsoleContext) as ConsoleContextObject;
  const style = {
    backgroundColor: '#0A1264',
    border: '2px solid #0A1264',
    boxSizing: 'border-box',
    borderRadius: '30px',
    borderWidth: '0',
    boxShadow: 'none',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '17px',
    letterSpacing: '0.1em',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    padding: '10px 15px',
    marginTop: '10px'
  };
  // @ts-ignore
  return <button className={"open-console btn btn-sm btn-primary btn-custom"} style={style}
                 onClick={() => context.toggleConsole(operation)}>Try it in our console</button>;
}
