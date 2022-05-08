import React, { useEffect, useState } from 'react';
import { getConfigUrl } from '../../config/config';
import Group from '../Group';
import Conditional from '../utils/Conditional';
import CodeSnippet from './CodeSnippet';

const configDocs = process.env['REACT_APP_DOCS_URL'];

const OOBE: React.FC = () => {
  const [configExample, setConfigExample] = useState<string>('');
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    fetch('/config/config.example.json')
      .then(rsp => (
        rsp.status === 200 ? rsp.text() : Promise.reject(`${rsp.status} ${rsp.statusText}`)
      ))
      .then(txt => setConfigExample(txt!))
      .catch(err => setError(err));
  }, [setError, setConfigExample]);
  return (
    <Group title="Welcome" key="oobe" vertical>
      <div>
        Please create a config file which will be available at <code>{getConfigUrl()}</code>
      </div>
      <Conditional visible={!!configDocs}>
        <div>
          More information about config syntax can be found <a href="/foo" target="_blank">here</a>
        </div>
      </Conditional>
      <Conditional visible={!!configExample?.length}>
        <>
          <div>
            <p>
              <b>Config example:</b>
            </p>
          </div>
          <CodeSnippet value={configExample} />
        </>
      </Conditional>
      <Conditional visible={!!error}>
        <>
          <p>
            <span><b>Error:</b> Failed to load config example: </span>
          </p>
          <div>
            <code>{error?.toString()}</code>
          </div>
        </>
      </Conditional>
    </Group>
  );
};

export default OOBE;
