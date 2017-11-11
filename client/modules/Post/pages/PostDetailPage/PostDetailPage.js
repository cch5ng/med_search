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
    this.props.dispatch(fetchSearch1(drug1))
  }

  handleFilterInputChange(val) {
    this.setState({filter: val})
  }

  filterSearchData(searchDataAr) {
    let filteredAr = searchDataAr.filter(item => item.name.toLowerCase().includes(this.state.filter) === true)
    return filteredAr
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

  //combined filter by tty with filter by input field
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

    if (this.props.search1Data) {
      populatedTTYList = this.getPopulatedTTYKeys()
    }

    return (
      <div>
        <p>Searched: drug1: {drug1}</p>
        <h3>Reference Drug Search Results</h3>
        <form>
          <input type="text" className="" placeholder="filter by dose form, strength" value={this.state.filter} 
            onChange={(ev) => this.handleFilterInputChange(ev.target.value)}/>
        </form>
        {populatedTTYList
          ? populatedTTYList.map((tty, idx) =>(
              <div key={`${tty}-${idx}`}>
                <h4 key={tty}>{TTY_TO_NAME[tty]}</h4>
                <SearchResultsList data={this.filterSearchResultsByTTY(tty)} 
                  drug1={drug1} needLink="true"
                />
              </div>
            ))
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
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    search1Data: getSearchData(state)
  };
}

export default withRouter(connect(mapStateToProps)(PostDetailPage))
