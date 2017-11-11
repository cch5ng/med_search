import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';

// Import Style
//import styles from '../../components/PostListItem/PostListItem.css';

import SearchResultsList from '../../components/SearchResultsList'
import SearchResultsList2 from '../../components/SearchResultsList2'

// Import Actions
import { fetchSearch2 } from '../../PostActions';

// Import Selectors
import { getSearch3Data } from '../../PostReducer';

class Search3 extends Component {

  componentDidMount() {
    console.log('s3 componentDidMount')
    let drug2 = this.props.match.params.drug2
    this.props.dispatch(fetchSearch2(drug2))
  }

  render() {
    let drug1 = this.props.match.params.drug1
    let drug2
    let search3DataSCD
    let search3DataSBD


    if (this.props.match.params.drug2 !== undefined) {
      drug2 = this.props.match.params.drug2
    }

    if (this.props.search3Data) {
      search3DataSCD = this.props.search3Data.search3DataSCD
      search3DataSBD = this.props.search3Data.search3DataSBD
      console.log('search3DataSCD: ' + search3DataSCD)
    }
    if (this.props.search3DataSBD) {
    }

    console.log('drug1: ' + drug1)
    console.log('drug2: ' + drug2)
    return (
      <div>
        <p>drug1: {drug1} > drug2: {drug2}</p>
        <h3>Generic and Brand Drug Results</h3>
        <div>
          <h4>SCD</h4>
          {search3DataSCD 
            ? (<SearchResultsList data={search3DataSCD} 
              drug1={drug1}
              />)
            : null
          }
          
        </div>

        <div>
          <h4>SBD</h4>
          { search3DataSBD
            ? (<SearchResultsList data={search3DataSBD} 
                drug1={drug1} needLink="false"
              />)
            : null
          }
        </div>
      </div>
    );  
  }


}

// Actions required to provide data for this component to render in sever side.
Search3.need = [params => {
  return getSearch3Data();
//  return fetchPost(params.cuid);
//  return fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    search3Data: getSearch3Data(state),
    //search3DataSCD: getSearch3DataSCD(state),
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