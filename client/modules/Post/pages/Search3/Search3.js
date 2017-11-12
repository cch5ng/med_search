import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';
import Loader from 'react-loader';

// Import Style
//import styles from '../../components/PostListItem/PostListItem.css';

import SearchResultsList from '../../components/SearchResultsList'
//import SearchResultsList2 from '../../components/SearchResultsList2'

// Import Actions
import { fetchSearch2 } from '../../PostActions';

// Import Selectors
import { getSearch3Data, getSearchData, getIsReceiving } from '../../PostReducer';

// Import Style
import styles from '../style2.css';

class Search3 extends Component {

  state = {
    filter: ''
  }

  componentDidMount() {
    let drug2Id = this.props.match.params.drug2
    let drug2Name
    let drug2Synonym
    let { search1Data } = this.props
    let queryObj = {}

    // TODO refactor and see if easier to save this earlier
    for (let i = 0; i < search1Data.length; i++) {
      if (search1Data[i]['conceptProperties']) {
        for (let j = 0; j < search1Data[i]['conceptProperties'].length; j++) {
          if (search1Data[i]['conceptProperties'][j]['rxcui'] === drug2Id) {
            drug2Name = search1Data[i]['conceptProperties'][j]['name']
            drug2Synonym = search1Data[i]['conceptProperties'][j]['synonym']
            break
          }
        }
      }
    }

    queryObj.rxcui = drug2Id
    queryObj.name = drug2Name
    queryObj.synonym = drug2Synonym

    this.props.dispatch(fetchSearch2(queryObj))
    this.setState({drug2Name})
  }

  handleFilterInputChange(val) {
    this.setState({filter: val})
  }

  filterSearchData(searchDataAr) {
    let filteredAr = searchDataAr.filter(item => item.name.toLowerCase().includes(this.state.filter) === true)
    return filteredAr
  }

  render() {
    let drug1 = this.props.match.params.drug1
    let drug2
    let search3DataSCD
    let search3DataSBD
    let filtered3DataSCD
    let filtered3DataSBD
    let loaded = !this.props.isReceiving

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
      <div className={styles.main}>
        <p className={styles.breadcrumb}>Searched: {drug1} > {this.state.drug2Name}</p>

        <h2>Semantic Branded Drug and Clinical Drug Results</h2>
        <div className={styles.spacerExtraSmall} />
        <form>
          <input type="text" className="" placeholder="filter by dose form, strength" value={this.state.filter} 
            onChange={(ev) => this.handleFilterInputChange(ev.target.value)}/>
        </form>
        <div className={styles.spacerSmall} />
        <Loader loaded={loaded} color="#03A9F4" >
          <div>
            <h3 className={styles.drugGroup}>Semantic Branded Drugs</h3>
              { filtered3DataSBD
                ? (<SearchResultsList data={filtered3DataSBD} 
                    drug1={drug1} needLink="false"
                  />)
                : <h4>There are no resulting Semantic Branded Drugs</h4>
              }
          </div>
          <div className={styles.spacerExtraSmall} />
          <div>
            <h3 className={styles.drugGroup}>Semantic Clinical Drugs</h3>
            {filtered3DataSCD 
              ? (<SearchResultsList data={filtered3DataSCD} 
                drug1={drug1} needLink="false"
                />)
              : <h4>There are no resulting Semantic Clinical Drugs</h4>
            }
          </div>
        </Loader>
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
    search1Data: getSearchData(state),
    search3Data: getSearch3Data(state),
    isReceiving: getIsReceiving(state)
  };
}

export default withRouter(connect(mapStateToProps)(Search3))
