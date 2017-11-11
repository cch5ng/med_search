import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

import SearchResultsList from '../../components/SearchResultsList'

// Import Actions
import { fetchSearch1 } from '../../PostActions';

// Import Selectors
import { getPost, getSearch1BPCK, getSearch1GPCK, getSearch1SBD, getSearch1SCD, getSearchData } from '../../PostReducer';

class PostDetailPage extends Component {
  componentDidMount() {
    let drug1 = this.props.match.params.drug1
    this.props.dispatch(fetchSearch1(drug1))
  }

  getPopulatedTTYKeys() {
    let populatedTTYKeys = []
    const TTY_KEYS_LIST = ['BPCK', 'GPCK', 'SBD', 'SCD']

    this.props.search1Data.forEach(group => {
      if (TTY_KEYS_LIST.indexOf(group['tty']) > -1 && group['conceptProperties'] && group['conceptProperties'].length) {
        populatedTTYKeys.push(group['tty'])
      }
    })

    return populatedTTYKeys
  }

  filterSearchResultsByTTY(tty) {
    //let dataByTTY = []

    //populatedTTYKeysList.forEach(tty => {
      //dataByTTY[tty] = 
    return this.props.search1Data.filter(group => group['tty'] === tty)[0]['conceptProperties']
    //})

    //return dataByTTY
  }

//export function PostDetailPage(props) {
  render() {
    let drug1 = this.props.match.params.drug1
    let populatedTTYList
    //let ttyToData

    if (this.props.search1Data) {
      populatedTTYList = this.getPopulatedTTYKeys()
      //ttyToData = this.filterSearchResultsByTTY(populatedTTYList)
      //console.log('SBD: ' + TTYToData['SBD'])
      //console.log('BPCK: ' + TTYToData['BPCK'])
      //console.log('BPCK[0]["rxcui"]: ' + TTYToData['BPCK'][0]['rxcui'])
    }

          // {TTYToData[tty].map(group => (
          //   <li>group.rxcui: group.name</li>
          // ))}

    return (
      <div>
        <h3>Reference Drug Search Results</h3>
        {populatedTTYList
          ? (populatedTTYList.map((tty, idx) =>(
              <div key={`${tty}-${idx}`}>
                <h4 key={tty}>{tty}</h4>
                <SearchResultsList data={this.filterSearchResultsByTTY(tty)} 
                  drug1={drug1}
                />
              </div>
            )))
          : null}

        <ul>
          <li><Link to={`/search/${drug1}/drug2`} >click for final results</Link></li>
        </ul>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
PostDetailPage.need = [params => {
  return getSearchData();
//  return fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    search1Data: getSearchData(state)
  };
}

export default withRouter(connect(mapStateToProps)(PostDetailPage))

/*
      <Helmet title={props.post.title} />
      <div className={`${styles['single-post']} ${styles['post-detail']}`}>
        <h3 className={styles['post-title']}>{props.post.title}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.name}</p>
        <p className={styles['post-desc']}>{props.post.content}</p>
      </div>

*/

//export default PostDetailPage
//  console.log('len BPCK: ' + this.props.search1BPCK.length)
//  console.log('len GPCK: ' + this.props.getSearch1GPCK.length)
//  console.log('len SBD: ' + this.props.getSearch1SBD.length)
//  console.log('len SCD: ' + this.props.getSearch1SCD.length)
//PostDetailPage.propTypes = {
  //post: PropTypes.shape({
    //name: PropTypes.string.isRequired,
    //title: PropTypes.string.isRequired,
    //content: PropTypes.string.isRequired,
    //slug: PropTypes.string.isRequired,
    //cuid: PropTypes.string.isRequired,
  //}).isRequired,
//};
    //search1BPCK: getSearch1BPCK(state),
    //search1GPCK: getSearch1GPCK(state),
    //search1SBD: getSearch1SBD(state),
    //search1SCD: getSearch1SCD(state),
//    post: getPost(state, props.params.cuid),
//connect(mapStateToProps)(PostDetailPage);

