import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';

// Import Components
//import PostListItem from './PostListItem/PostListItem';

class SearchResultsList extends Component {

  displayNameOrLink(med) {
    if (this.props.needLink === "false") {
      return (`${med['name']}`)
    }
    return (
      <Link to={`/search/${this.props.drug1}/${med['rxcui']}`} >
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
              <h3 className=''>
                {this.displayNameOrLink(med)}
              </h3>
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
