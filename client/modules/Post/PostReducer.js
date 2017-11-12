import { UPDATE_POST, ADD_POSTS, DELETE_POST, REQUEST_QUERY_S1, RECEIVE_QUERY_S1,
  REQUEST_QUERY_S2, RECEIVE_QUERY_S2, REQUEST_QUERY_S3, RECEIVE_QUERY_S3,
  ADD_POPULAR_QUERIES, SAVE_INGRED_ID_OBJ } from './PostActions';

// Initial State
const initialState = {receiving: false, queryString: {}, search3Data: [], search3DataSBD: [], search3DataSCD: []};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_QUERY_S1 :
      return {...state,
        receiving: action.receiving,
        queryString: {...state.queryString, query1: action.query}
      };
    case REQUEST_QUERY_S2 :
      return {...state,
        receiving: action.receiving,
        queryString: {...state.queryString, query2: action.queryObj}
      };
    case REQUEST_QUERY_S3 :
//      console.log('action.receiving: ' + action.receiving)
      let query3 = {}
      if (state.queryString.query3) {
         query3 = state.queryString.query3
      }
      let newQuery = {}
      newQuery[action.queryObj.id] = {id: action.queryObj.id, name: action.queryObj.name}

      return {...state,
        receiving: action.receiving,
        queryString: {...state.queryString, query3: {...query3, ...newQuery}}
      };

    case RECEIVE_QUERY_S1 :
      //console.log('action.receiving: ' + action.receiving)
      return {...state,
        receiving: action.receiving,
        search1Data: action.search1Data
      };

    case RECEIVE_QUERY_S2 :
      return {...state,
        receiving: action.receiving,
// TODO think data format will not be consistent if go through long search
// vs go through popular query link
        search2Data: action.search2Data
      };

    case RECEIVE_QUERY_S3 :
      return {...state,
        receiving: action.receiving,
        search3DataSBD: state.search3DataSBD
          ? [...state.search3DataSBD, ...action.search3DataSBD]
          : action.search3DataSBD,
        search3DataSCD: state.search3DataSCD
          ? [...state.search3DataSCD, ...action.search3DataSCD]
          : action.search3DataSCD,
      };

    case SAVE_INGRED_ID_OBJ :
      return {...state,
        ingredIdLookup: action.queryObj
      }

    case UPDATE_POST :
      let nextState = state.popularQueries.slice(0)
      let targetId = nextState.find(query => (query.cuid === action.post.cuid))
      nextState[targetId] = action.post
      return { ...state,
        popularQueries: nextState,
      };

    case ADD_POPULAR_QUERIES :
      return {
        popularQueries: action.posts,
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

export const getQueryString = state => state.posts.queryString

export const getPopularQueries = state => state.posts.popularQueries;

export const getIsReceiving = state => state.posts.receiving;

// Get post by cuid
export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

// export const getSearch1BPCK = (state) => state.search1Data.filter(group => group['tty'] === 'BPCK')[0]['conceptProperties'] || []

// export const getSearch1GPCK = (state) => state.search1Data.filter(group => group['tty'] === 'GPCK')[0]['conceptProperties'] || []

// export const getSearch1SBD = (state) => state.search1Data.filter(group => group['tty'] === 'SBD')[0]['conceptProperties'] || []

// export const getSearch1SCD = (state) => state.search1Data.filter(group => group['tty'] === 'SCD')[0]['conceptProperties'] || []


// Export Reducer
export default PostReducer;
