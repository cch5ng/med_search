/**
 * Client entry point
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader';
import App from './App';
import { configureStore } from './store';

// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('root');

render(
  <Provider store={store}>
    <AppContainer>
      <App  />
    </AppContainer>
  </Provider>,
  mountApp
);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./App').default; // eslint-disable-line global-require
    render(
      <Provider store={store}>
      <AppContainer>
        <App  />
      </AppContainer>
      </Provider>,
      mountApp
    );
  });
}

//        <NextApp store={store} />
