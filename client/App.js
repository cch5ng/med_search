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

// export default function App(props) {
//   return (
//       <IntlWrapper>
//           <Helmet
//             title="Med Search"
//             titleTemplate="%s - Blog App"
//             meta={[
//               { charset: 'utf-8' },
//               {
//                 'http-equiv': 'X-UA-Compatible',
//                 content: 'IE=edge',
//               },
//               {
//                 name: 'viewport',
//                 content: 'width=device-width, initial-scale=1',
//               },
//             ]}
//           />
//           <Header
//             switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
//             intl={this.props.intl}
//             toggleAddPost={this.toggleAddPostSection}
//           />


//         <Router >
//           <div>
//             {routes}
//           </div>
//         </Router>

//           <Footer />
//       </IntlWrapper>
//   );
// }



//          {routes}
// component={PostDetailPage}

/*

                        {routes}
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}

    <Provider store={props.store}>
    </Provider>

history={history}
    <Provider store={props.store}>
    </Provider>
          switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
          intl={this.props.intl}
          toggleAddPost={this.toggleAddPostSection}

*/