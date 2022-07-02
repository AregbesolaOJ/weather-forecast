import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';

export const TestNavigator = ({ children, params = {} }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('<App />', () => {
  cleanup();
  test('App loads first and is mounted', () => {
    const div = document.createElement('div');
    render(
      <TestNavigator>
        <App />
      </TestNavigator>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
