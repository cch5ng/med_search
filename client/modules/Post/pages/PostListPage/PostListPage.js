import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'

// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget/PostCreateWidget';

// Import Actions
import { addPostRequest, fetchPosts, deletePostRequest, fetchSearch1 } from '../../PostActions';
import { toggleAddPost } from '../../../App/AppActions';

// Import Selectors
import { getShowAddPost } from '../../../App/AppReducer';
import { getPosts } from '../../PostReducer';

class PostListPage extends Component {
  state = {
    query: ''
  }

  componentDidMount() {
    //TODO retrieve data for 5 most popular queries
    //this.props.dispatch(fetchPosts());
  }

  handleQueryInputChange = (val) => {
    this.setState({query: val})
  }

  submitSearch = (ev) => {
    let query = this.state.query
    this.props.history.push('/search/' + query)
    this.setState({query: ''})
  // TODO call action to append query str to backend (query frequency calc)
  }

/* TODO CLEAN
  handleDeletePost = post => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      this.props.dispatch(deletePostRequest(post));
    }
  };

  handleAddPost = (name, title, content) => {
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(addPostRequest({ name, title, content }));
  };
*/

  render() {
    return (
      <div>
        <div>
          <h3>New Search</h3>
          <form>
            <input type="text" className="" placeholder="drug name" value={this.state.query} 
              onChange={(ev) => this.handleQueryInputChange(ev.target.value)}/>
            <input type="button" className="" value="Search" onClick={this.submitSearch} />
          </form>
        </div>

        <div>
          <h3>OR Top 5 Searches (by ingredient)</h3>
          <ul>
            <li>placeholder</li>
            <li>placeholder</li>
            <li>placeholder</li>
            <li>placeholder</li>
            <li>placeholder</li>
          </ul>
        </div>
      </div>
    );
  }
}

// TODO add the component for 5 popular searches (I guess it is a link to the end results not the initial search string (like search1 query string))

/* 
        <PostCreateWidget addPost={this.handleAddPost} showAddPost={this.props.showAddPost} />
        <PostList handleDeletePost={this.handleDeletePost} posts={this.props.posts} />
*/

// Actions required to provide data for this component to render in sever side.
PostListPage.need = [() => { return fetchPosts(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddPost: getShowAddPost(state),
    //posts: getPosts(state),
  };
}

PostListPage.propTypes = {
  //posts: PropTypes.arrayOf(PropTypes.shape({
  //   name: PropTypes.string.isRequired,
  //   title: PropTypes.string.isRequired,
  //   content: PropTypes.string.isRequired,
  // })).isRequired,
  // showAddPost: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

PostListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default withRouter(connect(mapStateToProps)(PostListPage));
