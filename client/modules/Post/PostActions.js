import { callApiSearch1, callApiSearch2, callApiSearch3, callApi} from '../../util/apiCaller';

// Export Constants
export const REQUEST_QUERY_S1 = 'REQUEST_QUERY_S1';
export const RECEIVE_QUERY_S1 = 'RECEIVE_QUERY_S1';

export const REQUEST_QUERY_S2 = 'REQUEST_QUERY_S2';
export const RECEIVE_QUERY_S2 = 'RECEIVE_QUERY_S2';

export const REQUEST_QUERY_S3 = 'REQUEST_QUERY_S3';
export const RECEIVE_QUERY_S3 = 'RECEIVE_QUERY_S3';

export const ADD_POPULAR_QUERIES = 'ADD_POPULAR_QUERIES';
export const SAVE_INGRED_ID_OBJ = 'SAVE_INGRED_ID_OBJ';

export const UPDATE_POST = 'UPDATE_POST';

// Export Actions
export function saveIngredIdObj(queryObj) {
  return {
    type: SAVE_INGRED_ID_OBJ,
    queryObj
  };
}

export function requestQuerySearch1(query) {
  return {
    type: REQUEST_QUERY_S1,
    receiving: true,
    query
  };
}

export function receiveQuerySearch1(res) {
  return {
    type: RECEIVE_QUERY_S1,
    search1Data: res['drugGroup']['conceptGroup'],
    receiving: false
  };
}

// async action creator for initial drug search (PostsList)
export function fetchSearch1(query) {
  return (dispatch) => {
    dispatch(requestQuerySearch1(query))
    return callApiSearch1(query).then(res => {
      dispatch(receiveQuerySearch1(res));
    });
  };
}

export function requestQuerySearch2(queryObj) {
  return {
    type: REQUEST_QUERY_S2,
    receiving: true,
    queryObj
  };
}

export function receiveQuerySearch2(res) {
  return {
    type: RECEIVE_QUERY_S2,
    search2Data: res['relatedGroup']['conceptGroup'],
    receiving: false
  };
}

// async action creator for ingredients search given reference drug
// (PostsDetail or from popular Queries)
export function fetchSearch2(queryObj) {
  return (dispatch) => {
    dispatch(requestQuerySearch2(queryObj))
    return callApiSearch2(queryObj.rxcui).then(res => {
      dispatch(receiveQuerySearch2(res));
      let search2ConceptProps = res['relatedGroup']['conceptGroup'][0]['conceptProperties']
// QUESTION not sure this is handling multiple ingredients case correctly
      let ingredObj = {}
      search2ConceptProps.forEach(prop => {
         ingredObj[prop['rxcui']] = {id: prop['rxcui'], name: prop['name']}
      })
      dispatch(updatePostAsync(queryObj))

      Object.keys(ingredObj).forEach(ingredRxcui => {
        dispatch(fetchSearch3(ingredObj[ingredRxcui], ingredRxcui))
      })
    });
  };
}

export function requestQuerySearch3(queryObj) {
  return {
    type: REQUEST_QUERY_S3,
    receiving: true,
    queryObj
  };
}

export function receiveQuerySearch3(res) {
  return {
    type: RECEIVE_QUERY_S3,
    search3DataSBD: res['relatedGroup']['conceptGroup'].filter(item => item['tty'] === 'SBD')[0]['conceptProperties'],
    search3DataSCD: res['relatedGroup']['conceptGroup'].filter(item => item['tty'] === 'SCD')[0]['conceptProperties'],
    receiving: false
  };
}

// async action creator for related drugs (SBD, SBC) given ingredient
// triggered within fetchSearch2() only
export function fetchSearch3(queryObj, queryId) {
  return (dispatch) => {
    dispatch(requestQuerySearch3(queryObj))
    return callApiSearch3(queryId).then(res => {
      dispatch(receiveQuerySearch3(res));
    });
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POPULAR_QUERIES,
    posts,
  };
}

// async action creator to get popular queries from the backend
// gets all sorted by frequency (high to low)
export function fetchPosts() {
  return (dispatch) => {
    return callApi('posts').then(res => {
      dispatch(addPosts(res.posts));
    });
  };
}

export function updatePost(post) {
  return {
    type: UPDATE_POST,
    post,
  };
}

// async action creator to update BE popular queries frequency list
export function updatePostAsync(queryObj) {
  let id = queryObj.rxcui
  return (dispatch) => {
    return callApi(`posts/${id}`, 'put', queryObj).then(res => dispatch(updatePost(res.post)));
  };
}
