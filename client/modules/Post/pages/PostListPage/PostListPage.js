import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'

// Import Components
import PostList from '../../components/PostList';
//import PostCreateWidget from '../../components/PostCreateWidget/PostCreateWidget';

// Import Actions
import { fetchSearch1, fetchPosts } from '../../PostActions';
//import { toggleAddPost } from '../../../App/AppActions';

// Import Style
import styles from '../style2.css';

// Import Selectors
// import { getShowAddPost } from '../../../App/AppReducer';
import { getPopularQueries } from '../../PostReducer';

class PostListPage extends Component {
  state = {
    query: ''
  }

  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  // input event handler (onChange)
  handleQueryInputChange = (val) => {
    this.setState({query: val})
  }

  // search redirects route which triggers action/fetch
  submitSearch = (ev) => {
    let query = this.state.query
    if (query.length) {
      this.props.history.push('/search/' + query)
    }
    this.setState({query: ''})
  }

  render() {
    let popularQueries
    if (this.props.popularQueries) {
      popularQueries = this.props.popularQueries.slice(0, 5)
    } 

    return (
      <div className={styles.main}>
        <div>
          <h2>New Search</h2>
          <div className={styles.spacerExtraSmall} />
          <form>
            <input type="text" className="" placeholder="drug name" value={this.state.query} 
              onChange={(ev) => this.handleQueryInputChange(ev.target.value)}/>
            <br />
            <input type="button" className={styles.btnSearch} value="Search" onClick={this.submitSearch} />
          </form>
        </div>
        <div className={styles.spacerSmall} />
        <div>
          <h2>Top 5 Searches (by reference drug)</h2>
          <ul>
          {popularQueries && popularQueries.length
            ? popularQueries.map(query => (
              <li key={query._id} className={styles.listItemPopular}>
                <Link to={`/searchReference/${query.rxcui}`}>{query.name}</Link>
              </li>
            ))
            : null
          }
          </ul>
        </div>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
PostListPage.need = [() => { return fetchPosts(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    popularQueries: getPopularQueries(state)
  };
}

PostListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

PostListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default withRouter(connect(mapStateToProps)(PostListPage));
