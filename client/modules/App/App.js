import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// default view for initial drug input
import PostListPage from '../../modules/Post/pages/PostListPage/PostListPage';
// reference drug list
import PostDetailPage from '../../modules/Post/pages/PostDetailPage/PostDetailPage';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  render() {
    return (
      <div>
        <Helmet
          title="Med Search"
          titleTemplate="%s - Blog App"
          meta={[
            { charset: 'utf-8' },
            {
              'http-equiv': 'X-UA-Compatible',
              content: 'IE=edge',
            },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1',
            },
          ]}
        />
        <Header />

        <Switch>
            <Route exact path="/" component={require("../../modules/Post/pages/PostListPage/PostListPage").default} />
            <Route exact path="/searchReference/:drug2" 
              component={require("../../modules/Post/pages/Search4/Search4").default}
            />
            <Route exact path="/search/:drug1" 
              component={require("../../modules/Post/pages/PostDetailPage/PostDetailPage").default}
            />
            <Route exact path="/search/:drug1/:drug2" 
              component={require("../../modules/Post/pages/Search3/Search3").default}
            />
        </Switch>
        <div className={styles.spacerExtraLarge} />
        <Footer />
      </div>
    );
  }
}


App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    //intl: 'EN' //store.intl,
  };
}

export default connect(mapStateToProps)(App);
