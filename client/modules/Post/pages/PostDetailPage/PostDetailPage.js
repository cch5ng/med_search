import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';
import Loader from 'react-loader';

// Import Style
import styles from '../style2.css';
//import styles from '../../components/PostListItem/PostListItem.css';

import SearchResultsList from '../../components/SearchResultsList'

// Import Actions
import { fetchSearch1 } from '../../PostActions';

// Import Selectors
import { getSearchData, getIsReceiving } from '../../PostReducer';

const TTY_TO_NAME = {
  'BPCK': 'Brand Name Pack',
  'GPCK': 'Generic Pack',
  'SBD': 'Semantic Branded Drug',
  'SCD': 'Semantic Clinical Drug'
}

class PostDetailPage extends Component {
  state = {
    filter: ''
  }

  componentDidMount() {
    let drug1 = this.props.match.params.drug1
    if (drug1.length && typeof drug1 === 'string') {
      this.props.dispatch(fetchSearch1(drug1))
    }
  }

  // input handler to filter returned search results (ref drugs)
  handleFilterInputChange(val) {
    this.setState({filter: val})
  }

  // filters the given list by input filter
  filterSearchData(searchDataAr) {
    let filteredAr = searchDataAr.filter(item => item.name.toLowerCase().includes(this.state.filter.toLowerCase()) === true)
    return filteredAr
  }

  // get tty values for current search results for grouping data
  getPopulatedTTYKeys() {
    let populatedTTYKeys = []
    // TODO not definite this is the complete list; maybe it was just for a test sample
    const TTY_KEYS_LIST = ['BPCK', 'GPCK', 'SBD', 'SCD']

    this.props.search1Data.forEach(group => {
      if (TTY_KEYS_LIST.indexOf(group['tty']) > -1 && group['conceptProperties'] && group['conceptProperties'].length) {
        populatedTTYKeys.push(group['tty'])
      }
    })

    return populatedTTYKeys
  }

  // group search results by tty and add filter by input field
  filterSearchResultsByTTY(tty) {
    let filter1 = this.props.search1Data.filter(group => group['tty'] === tty)[0]['conceptProperties']
    let filter2

    if (this.state.filter.length) {
      filter2 = this.filterSearchData(filter1)
      return filter2
    }

    return filter1
  }

  render() {
    let drug1 = this.props.match.params.drug1
    let populatedTTYList
    let loaded = !this.props.isReceiving

    if (this.props.search1Data) {
      populatedTTYList = this.getPopulatedTTYKeys()
    }

    return (
      <div className={styles.main}>
        <p className={styles.breadcrumb}>Searched: {drug1}</p>

        <h2>Reference Drug Search Results</h2>
        <div className={styles.spacerExtraSmall} />
        <form>
          <input type="text" className="" placeholder="filter by dose form, strength" value={this.state.filter} 
            onChange={(ev) => this.handleFilterInputChange(ev.target.value)}/>
        </form>
        <div className={styles.spacerSmall} />
        <Loader loaded={loaded} color="#03A9F4" lines={13} >
          {populatedTTYList
            ? populatedTTYList.map((tty, idx) =>(
                <div key={`outter-${tty}`}>
                  <div key={`${tty}-${idx}`}>
                    <h3 className={styles.drugGroup} key={tty}>{TTY_TO_NAME[tty]}</h3>
                    <SearchResultsList data={this.filterSearchResultsByTTY(tty)} 
                      drug1={drug1} needLink="true"
                    />
                  </div>
                  <div className={styles.spacerExtraSmall} />
                </div>
              ))
            : (<h4>There are no search results. Please <Link to="/">try again.</Link></h4>) 
          }
        </Loader>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
PostDetailPage.need = [params => {
  return getSearchData();
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    search1Data: getSearchData(state),
    isReceiving: getIsReceiving(state)
  };
}

export default withRouter(connect(mapStateToProps)(PostDetailPage))
