import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

// Import Components
//import PostListItem from './PostListItem/PostListItem';

function SearchResultsList(props) {
  return (
    <div className="listView">
      {
        props.data.map(med => (
          <div key={med['rxcui']} className=''>
            <h3 className=''>
              <Link to={`/search/${props.drug1}/${med['rxcui']}`} >
                {med['name']}
              </Link>
            </h3>
            <p className=''>Synonym: {med['synonym']}</p>
            <p className=''>Suppress: {med['suppress']}</p>
            <hr className='' />
          </div>
        ))
      }
    </div>
  );
}

export default SearchResultsList;
