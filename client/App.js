/**
 * Root Component
 */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import Routes
import routes from './routes';

import Helmet from 'react-helmet';
import DevTools from './modules/App/components/DevTools';
import Header from './modules/App/components/Header/Header';
import Footer from './modules/App/components/Footer/Footer';


// Base stylesheet
require('./main.css');

export default function App(props) {
  return (
        <Router >
          {routes}
        </Router>
  );
}

App.propTypes = {
  //store: React.PropTypes.object.isRequired,
};

//import IntlWrapper from './modules/Intl/IntlWrapper';
