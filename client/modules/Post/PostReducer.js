import { ADD_POST, ADD_POSTS, DELETE_POST, REQUEST_QUERY_S1, RECEIVE_QUERY_S1,
  REQUEST_QUERY_S2, RECEIVE_QUERY_S2, REQUEST_QUERY_S3, RECEIVE_QUERY_S3} from './PostActions';

// Initial State
const initialState = { data: [] };

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_QUERY_S1 :
    case REQUEST_QUERY_S2 :
    case REQUEST_QUERY_S3 :
      console.log('action.receiving: ' + action.receiving)
      return {...state,
        receiving: action.receiving,
      };

    case RECEIVE_QUERY_S1 :
      console.log('action.receiving: ' + action.receiving)
      return {...state,
        receiving: action.receiving,
        search1Data: action.search1Data
      };

    case RECEIVE_QUERY_S2 :
      return {...state,
        receiving: action.receiving,
        search2Data: action.search2Data
      };

    case RECEIVE_QUERY_S3 :
      //console.log('action.receiving: ' + action.receiving)
      return {...state,
        receiving: action.receiving,
        search3DataSBD: action.search3DataSBD,
        search3DataSCD: action.search3DataSCD
      };

    case ADD_POST :
      return {
        data: [action.post, ...state.data],
      };

    case ADD_POSTS :
      return {
        data: action.posts,
      };

    case DELETE_POST :
      return {
        data: state.data.filter(post => post.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getSearchData = state => state.posts.search1Data;

export const getSearch3Data = state => ({search3DataSBD: state.posts.search3DataSBD, 
    search3DataSCD: state.posts.search3DataSCD 
  });


//export const getSearch3DataSBD = state => state.posts.search3DataSBD;

//export const getSearch3DataSCD = state => state.posts.search3DataSCD;

// Get post by cuid
export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

export const getSearch1BPCK = (state) => state.search1Data.filter(group => group['tty'] === 'BPCK')[0]['conceptProperties'] || []

export const getSearch1GPCK = (state) => state.search1Data.filter(group => group['tty'] === 'GPCK')[0]['conceptProperties'] || []

export const getSearch1SBD = (state) => state.search1Data.filter(group => group['tty'] === 'SBD')[0]['conceptProperties'] || []

export const getSearch1SCD = (state) => state.search1Data.filter(group => group['tty'] === 'SCD')[0]['conceptProperties'] || []


// Export Reducer
export default PostReducer;
