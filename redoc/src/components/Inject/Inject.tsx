import * as React from 'react';
import { useState, useEffect } from 'react';

const url = location.hostname.includes('localhost')
  ? `http://${location.hostname}:8085/kycapi/console/docInjects`
  : `//${location.hostname}/kycapi/console/docInjects`;
let injects = fetch(url)
  .then((response) => response.text())
  .then((js) => js && eval(`(${js})`));

export function Inject({ hook, data }) {
  let [html, setHtml] = useState('');

  useEffect(() => {
    injects.then((hooks) => hooks[hook] && setHtml(hooks[hook](data)));
  }, [injects, hook, data]);

  if (React.isValidElement(html)) {
    return html;
  }
  if (typeof html === 'string') {
    return <span dangerouslySetInnerHTML={{ __html: html }}></span>;
  }
  return <span>{html}</span>;
}
