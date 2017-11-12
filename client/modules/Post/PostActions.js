import { callApiSearch1, callApiSearch2, callApiSearch3, callApi} from '../../util/apiCaller';

// Export Constants
export const REQUEST_QUERY_S1 = 'REQUEST_QUERY_S1';
export const RECEIVE_QUERY_S1 = 'RECEIVE_QUERY_S1';

export const REQUEST_QUERY_S2 = 'REQUEST_QUERY_S2';
export const RECEIVE_QUERY_S2 = 'RECEIVE_QUERY_S2';

export const REQUEST_QUERY_S3 = 'REQUEST_QUERY_S3';
export const RECEIVE_QUERY_S3 = 'RECEIVE_QUERY_S3';

export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';

// Export Actions
export function requestQuerySearch1(query) {
  return {
    type: REQUEST_QUERY_S1,
    receiving: true,
    query
  };
}

export function receiveQuerySearch1(res) {
  // console.log('res: ' + res)
  // console.log('keys res: ' + Object.keys(res))
  return {
    type: RECEIVE_QUERY_S1,
    search1Data: res['drugGroup']['conceptGroup'],
    receiving: false
  };
}

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
   console.log('res: ' + res)
   console.log('keys res: ' + Object.keys(res))
  return {
    type: RECEIVE_QUERY_S2,
    search2Data: res['relatedGroup']['conceptGroup'],
    receiving: false
  };
}

export function fetchSearch2(queryObj) {
  return (dispatch) => {
    dispatch(requestQuerySearch2(queryObj))
    return callApiSearch2(Object.keys(queryObj)[0]).then(res => {
      dispatch(receiveQuerySearch2(res));
      let search2ConceptProps = res['relatedGroup']['conceptGroup'][0]['conceptProperties']
// QUESTION not sure this is handling multiple ingredients case correctly
      let ingredObj = {}
      search2ConceptProps.forEach(prop => {
        ingredObj[prop['rxcui']] = {id: prop['rxcui'], name: prop['name']}
      })
      console.log('ingredObj: ' + ingredObj)
        console.log('keys ingredObj: ' + Object.keys(ingredObj))


      //let ingredRxcuiAr = search2ConceptProps.map(prop => (prop['rxcui']))
      //console.log('ingredRxcuiAr: ' + ingredRxcuiAr)
      Object.keys(ingredObj).forEach(ingredRxcui => {
        dispatch(fetchSearch3(ingredObj[ingredRxcui]))
      })
    });
  };
}

// Export Actions
export function requestQuerySearch3(queryObj) {
  return {
    type: REQUEST_QUERY_S3,
    receiving: true,
    queryObj
  };
}

export function receiveQuerySearch3(res) {
  console.log(' receiveQuerySearch3 axn ')
  console.log('res: ' + res)
  console.log('keys res: ' + Object.keys(res))
  return {
    type: RECEIVE_QUERY_S3,
    //search3Data: res['relatedGroup']['conceptGroup'],
    search3DataSBD: res['relatedGroup']['conceptGroup'].filter(item => item['tty'] === 'SBD')[0]['conceptProperties'],
    search3DataSCD: res['relatedGroup']['conceptGroup'].filter(item => item['tty'] === 'SCD')[0]['conceptProperties'],
    receiving: false
  };
}

export function fetchSearch3(queryObj) {
  console.log('fetchS3 queryObj: ' + queryObj)
  console.log('fetchS3 keys queryObj: ' + Object.keys(queryObj))
  console.log('queryObj.id: ' + queryObj.id)
  return (dispatch) => {
    dispatch(requestQuerySearch3(queryObj))
    return callApiSearch3(queryObj.id).then(res => {
      dispatch(receiveQuerySearch3(res));
    });
  };
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    return callApi('posts', 'post', {
      post: {
        name: post.name,
        title: post.title,
        content: post.content,
      },
    }).then(res => dispatch(addPost(res.post)));
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return callApi('posts').then(res => {
      dispatch(addPosts(res.posts));
    });
  };
}

export function fetchPost(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function deletePostRequest(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'delete').then(() => dispatch(deletePost(cuid)));
  };
}
