import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';

// Import Style
//import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import { fetchSearch2 } from '../../PostActions';

// Import Selectors
//import { getPost } from '../../PostReducer';

class Search3 extends Component {

  componentDidMount() {
    let drug2 = this.props.match.params.drug2
    this.props.dispatch(fetchSearch2(drug2))
  }

  render() {
    let drug1 = this.props.match.params.drug1
    let drug2


    if (this.props.match.params.drug2 !== undefined) {
      drug2 = this.props.match.params.drug2
    }

    console.log('drug1: ' + drug1)
    console.log('drug2: ' + drug2)
    return (
      <div>
        <h3>Generic and Brand Drug Results</h3>
        <p>drug1: {drug1}</p>
        <p>drug2: {drug2}</p>
        <ul>
          <li><Link to={`/search/${drug1}/drug2`} >click for final results</Link></li>
        </ul>
      </div>
    );  
  }


}

// Actions required to provide data for this component to render in sever side.
// Search3.need = [params => {
//   return fetchPost(params.cuid);
// }];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    //post: getPost(state, props.params.cuid),
  };
}

export default withRouter(connect(mapStateToProps)(Search3))


/*
      <Helmet title={props.post.title} />
      <div className={`${styles['single-post']} ${styles['post-detail']}`}>
        <h3 className={styles['post-title']}>{props.post.title}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.name}</p>
        <p className={styles['post-desc']}>{props.post.content}</p>
      </div>

      //export default Search3
//connect(mapStateToProps)(PostDetailPage);
//PostDetailPage.propTypes = {
  //post: PropTypes.shape({
    //name: PropTypes.string.isRequired,
    //title: PropTypes.string.isRequired,
    //content: PropTypes.string.isRequired,
    //slug: PropTypes.string.isRequired,
    //cuid: PropTypes.string.isRequired,
  //}).isRequired,
//};

*/