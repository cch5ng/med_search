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
import { fetchSearch3 } from '../../PostActions';

// Import Selectors
import { getSearch3Data, getSearchData, getIngredIdLookup, getPopularQueries } from '../../PostReducer';

// Import Style
import styles from '../style2.css';

class Search4 extends Component {

  state = {
    filter: ''
  }

  componentDidMount() {
    console.log('ingred3: ' + this.props.match.params.ingred3)
    let ingred3Id = this.props.match.params.ingred3

    this.props.dispatch(fetchSearch3(ingred3Id))
    if (this.props.popularQueries && this.props.popularQueries.length) {
      let ingred3Name = this.props.popularQueries.filter(query => (query.id === ingred3Id))[0].name
      //console.log('ingred3Name: ' + ingred3Name)
      this.setState({ingred3: ingred3Name})
    } else {
      this.setState({ingred3: ingred3Id})
    }
  }

  handleFilterInputChange(val) {
    this.setState({filter: val})
  }

  filterSearchData(searchDataAr) {
    let filteredAr = searchDataAr.filter(item => item.name.toLowerCase().includes(this.state.filter) === true)
    return filteredAr
  }

  render() {
    // let drug1 = this.props.match.params.drug1
    // let drug2
    let search3DataSCD
    let search3DataSBD
    let filtered3DataSCD
    let filtered3DataSBD
    //let ingred3Name

    // if (this.props.match.params.drug2 !== undefined) {
    //   drug2 = this.props.match.params.drug2
    // }

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
        <p className={styles.breadcrumb}>Searched: Ingredient {this.state.ingred3}</p>

        <h2>Semantic Clinical and Brand Drug Results</h2>
        <div className={styles.spacerExtraSmall} />
        <form>
          <input type="text" className="" placeholder="filter by dose form, strength" value={this.state.filter} 
            onChange={(ev) => this.handleFilterInputChange(ev.target.value)}/>
        </form>
        <div className={styles.spacerSmall} />
        <div>
          <h3 className={styles.drugGroup}>Semantic Clinical Drugs</h3>
          {filtered3DataSCD 
            ? (<SearchResultsList data={filtered3DataSCD} 
               needLink="false"
              />)
            : <h4>There are no resulting Semantic Clinical Drugs</h4>
          }
          
        </div>
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
    ingredIdLookup: getIngredIdLookup(state)
  };
}

export default withRouter(connect(mapStateToProps)(Search4))
