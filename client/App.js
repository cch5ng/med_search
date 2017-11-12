/**
 * Root Component
 */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import IntlWrapper from './modules/Intl/IntlWrapper';
//import { createBrowserHistory } from 'history';

// Import Routes
import routes from './routes';

import Helmet from 'react-helmet';
import DevTools from './modules/App/components/DevTools';
import Header from './modules/App/components/Header/Header';
import Footer from './modules/App/components/Footer/Footer';


// Base stylesheet
require('./main.css');

//const history = createBrowserHistory();

export default function App(props) {
  return (
    <IntlWrapper>
        <Router >
          {routes}
        </Router>
    </IntlWrapper>
  );
}

App.propTypes = {
  //store: React.PropTypes.object.isRequired,
};
