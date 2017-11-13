import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';

// Import Style
import styles from '../pages/style2.css';

class SearchResultsList extends Component {

  displayNameOrLink(med) {
    if (this.props.needLink === "false") {
      return (`${med['name']}`)
    }
    return (
      <Link className={styles.drugLink} to={`/search/${this.props.drug1}/${med['rxcui']}`} >
        {med['name']}
      </Link>
    )
  }

  render() {
    return (
      <div className="listView">
        {
          this.props.data.map(med => (
            <div key={med['rxcui']} className=''>
              <h4 className={styles.drugName}>
                {this.displayNameOrLink(med)}
              </h4>
              <p className=''>Synonym: {med['synonym']}</p>
              <p className=''>Suppress: {med['suppress']}</p>
              <hr className='' />
            </div>
          ))
        }
      </div>
    )  
  }
}

export default SearchResultsList;
