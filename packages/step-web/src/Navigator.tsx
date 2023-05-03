import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { App } from './containers/App';

const Router = ({ path = '' }) => {
  return (
      <App />
  );
};

export const Navigator: React.FC = () => (
    <Router />
);
