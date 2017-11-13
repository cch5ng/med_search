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
import { getSearch3Data, getSearchData, getPopularQueries, getIsReceiving } from '../../PostReducer';

// Import Style
import styles from '../style2.css';

// TODO refactor and see if this could just be merged into Search3
class Search4 extends Component {

  state = {
    filter: ''
  }

  componentDidMount() {
    let queryObj = {}
    let drug2rxcui = this.props.match.params.drug2
    let targetRefDrug

    // get reference drug to lookup name
    if (this.props.popularQueries) {
      targetRefDrug = this.props.popularQueries.filter(query => query.rxcui === drug2rxcui)[0]
    }

    queryObj.rxcui = drug2rxcui
    queryObj.name = targetRefDrug.name
    queryObj.synonym = targetRefDrug.synonym

    this.setState({
      refDrugName: targetRefDrug.name,
      //refDrugSynonym: targetRefDrug.synonym
    })
    this.props.dispatch(fetchSearch2(queryObj))
  }

  // input event handler (onChange) for filtering sarch results
  handleFilterInputChange(val) {
    this.setState({filter: val})
  }

  // filters given list (search results)
  filterSearchData(searchDataAr) {
    let filteredAr = searchDataAr.filter(item => item.name.toLowerCase().includes(this.state.filter.toLowerCase()) === true)
    return filteredAr
  }

  render() {
    let drug2 = this.props.match.params.drug2
    let drug2Synonym
    let search3DataSCD
    let search3DataSBD
    let filtered3DataSCD
    let filtered3DataSBD
    let loaded = !this.props.isReceiving

    if (this.props.search3Data) {
      search3DataSCD = this.props.search3Data.search3DataSCD
      search3DataSBD = this.props.search3Data.search3DataSBD
      filtered3DataSCD = search3DataSCD
      filtered3DataSBD = search3DataSBD

      if (this.state.filter.length) {
        filtered3DataSCD = this.filterSearchData(search3DataSCD)
        filtered3DataSBD = this.filterSearchData(search3DataSBD)
      }
    }

    return (
      <div className={styles.main}>
        <p className={styles.breadcrumb}>Searched: Reference {this.state.refDrugName ? this.state.refDrugName : drug2}</p>

        <h2>Semantic Branded Drug and Clinical Drug Results</h2>
        <div className={styles.spacerExtraSmall} />
        <form>
          <input type="text" className="" placeholder="filter by ingredient, dose form, strength" value={this.state.filter} 
            onChange={(ev) => this.handleFilterInputChange(ev.target.value)}/>
        </form>
        <Loader loaded={loaded} color="#03A9F4" >
          <div className={styles.spacerSmall} />
          <div className={styles.spacerExtraSmall} />
          <div>
            <h3 className={styles.drugGroup}>Semantic Branded Drugs</h3>
            { filtered3DataSBD
              ? (<SearchResultsList data={filtered3DataSBD} 
                   needLink="false"
                />)
              : <h4>There are no resulting Semantic Branded Drugs</h4>
            }
          </div>
          <div>
            <h3 className={styles.drugGroup}>Semantic Clinical Drugs</h3>
            {filtered3DataSCD 
              ? (<SearchResultsList data={filtered3DataSCD} 
                 needLink="false"
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
Search4.need = [params => {
  return getSearch3Data();
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    popularQueries: getPopularQueries(state),
    search3Data: getSearch3Data(state),
    isReceiving: getIsReceiving(state)
  };
}

export default withRouter(connect(mapStateToProps)(Search4))
