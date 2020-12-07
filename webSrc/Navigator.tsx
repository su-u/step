import React from 'react';
import { Switch, HashRouter } from 'react-router-dom';
import { App } from './containers/App';

const Router = ({ path = '' }) => {
  return (
    <Switch>
      <App />
    </Switch>
  );
};

export const Navigator: React.FC = () => (
    <HashRouter>
        <Router />
    </HashRouter>
);
