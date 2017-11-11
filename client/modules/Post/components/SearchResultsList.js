import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

// Import Components
//import PostListItem from './PostListItem/PostListItem';

function SearchResultsList(props) {
  console.log('props.data: ' + props.data)
  //console.log('keys props.data[0]: ' + Object.keys(props.data[0]))
  return (
    <div className="listView">
      {
        props.data.map(med => (
          <div key={med['rxcui']} className=''>
            <h3 className=''>
              <Link to={`/search/${props.drug1}/${med['rxcui']}`} >
                {med['name']}
              </Link>)
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


//PostList.propTypes = {
  // posts: PropTypes.arrayOf(PropTypes.shape({
  //   name: PropTypes.string.isRequired,
  //   title: PropTypes.string.isRequired,
  //   content: PropTypes.string.isRequired,
  //   slug: PropTypes.string.isRequired,
  //   cuid: PropTypes.string.isRequired,
  // })).isRequired,
  // handleDeletePost: PropTypes.func.isRequired,
//};
/* 
            <p className=''> {med['tty']}</p>
*/