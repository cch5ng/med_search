import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';

// Import Style
//import styles from '../../components/PostListItem/PostListItem.css';

import SearchResultsList from '../../components/SearchResultsList'
//import SearchResultsList2 from '../../components/SearchResultsList2'

// Import Actions
import { fetchSearch2 } from '../../PostActions';

// Import Selectors
import { getSearch3Data } from '../../PostReducer';

class Search3 extends Component {

  state = {
    filter: ''
  }

  componentDidMount() {
    let drug2 = this.props.match.params.drug2
    this.props.dispatch(fetchSearch2(drug2))
  }

  handleFilterInputChange(val) {
    this.setState({filter: val})
  }

  filterSearchData(searchDataAr) {
    if (this.state.filter.length) {
      let filteredAr = searchDataAr.filter(item => item.name.toLowerCase().includes(this.state.filter) === true)
      return filteredAr
    }
    return searchDataAr
  }

  render() {
    let drug1 = this.props.match.params.drug1
    let drug2
    let search3DataSCD
    let search3DataSBD
    let filtered3DataSCD
    let filtered3DataSBD

    if (this.props.match.params.drug2 !== undefined) {
      drug2 = this.props.match.params.drug2
    }

    if (this.props.search3Data) {
      search3DataSCD = this.props.search3Data.search3DataSCD
      search3DataSBD = this.props.search3Data.search3DataSBD
      //console.log('search3DataSCD: ' + search3DataSCD)
      filtered3DataSCD = search3DataSCD
      filtered3DataSBD = search3DataSBD

      if (this.state.filter.length) {
        filtered3DataSCD = this.filterSearchData(search3DataSCD)
        filtered3DataSBD = this.filterSearchData(search3DataSBD)
      }
    }

    return (
      <div>
        <p>Searched: drug1: {drug1} > drug2: {drug2}</p>
        <form>
          <input type="text" className="" placeholder="filter by dose form, strength" value={this.state.filter} 
            onChange={(ev) => this.handleFilterInputChange(ev.target.value)}/>
        </form>
        <h3>Semantic Clinical and Brand Drug Results</h3>
        <div>
          <h4>Semantic Clinical Drugs</h4>
          {filtered3DataSCD 
            ? (<SearchResultsList data={filtered3DataSCD} 
              drug1={drug1} needLink="false"
              />)
            : <h4>There are no resulting Semantic Clinical Drugs</h4>
          }
          
        </div>

        <div>
          <h4>Semantic Branded Drugs</h4>
          { filtered3DataSBD
            ? (<SearchResultsList data={filtered3DataSBD} 
                drug1={drug1} needLink="false"
              />)
            : <h4>There are no resulting Semantic Branded Drugs</h4>
          }
        </div>
      </div>
    );  
  }


}

// Actions required to provide data for this component to render in sever side.
Search3.need = [params => {
  return getSearch3Data();
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    search3Data: getSearch3Data(state),
  };
}

export default withRouter(connect(mapStateToProps)(Search3))
