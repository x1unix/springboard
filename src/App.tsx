import React, { useState, useEffect } from 'react';
import { Config, fetchConfig, getBackgroundStyles } from './config/config';
import AppsList from './compoments/AppsList';
import Page from './compoments/Page';
import Group from './compoments/Group';
import Spinner from './compoments/Spinner';
import './App.scss';
import ConfigNotFoundError from './config/error';
import OOBE from './compoments/OOBE/OOBE';

const renderError = (err: Error) => (
  err instanceof ConfigNotFoundError ? (
    <OOBE />
  ) : (
    <Group title="Error" key="error" vertical>
      <p>
        Failed to fetch dashboard config:
      </p>
      <div>
        <code>{err?.message}</code>
      </div>
    </Group>
  )
);

const App: React.FC = () => {
  const [error, setError] = useState<Error>();
  const [config, setConfig] = useState<Config>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchConfig().then(cfg => {
      setLoading(false);
      setConfig(cfg);
    }).catch(err => {
      setLoading(false);
      setError(err);
    });
  }, []);

  if (isLoading) {
    return <Spinner centered />
  }

  return <>
    <div
      className="Page__background"
      style={getBackgroundStyles(config)}
    />
    <Page title={config?.title ?? 'Springboard'}>
      {error ? renderError(error) : (
        <AppsList categories={config?.groups} />
      )}
    </Page>
  </>
};

export default App;
