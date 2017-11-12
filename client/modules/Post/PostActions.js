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
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';

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
   // console.log('res: ' + res)
   // console.log('keys res: ' + Object.keys(res))
  return {
    type: RECEIVE_QUERY_S2,
    search2Data: res['relatedGroup']['conceptGroup'],
    receiving: false
  };
}

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
      //console.log('ingredObj: ' + ingredObj)
      //dispatch(saveIngredIdObj(ingredObj))
      //  console.log('keys ingredObj: ' + Object.keys(ingredObj))
      dispatch(updatePostAsync(queryObj))


      //let ingredRxcuiAr = search2ConceptProps.map(prop => (prop['rxcui']))
      //console.log('ingredRxcuiAr: ' + ingredRxcuiAr)
      Object.keys(ingredObj).forEach(ingredRxcui => {
          dispatch(fetchSearch3(ingredRxcui))
//        dispatch(fetchSearch3(ingredObj[ingredRxcui]))
      })
    });
  };
}

// Export Actions
export function requestQuerySearch3() {
  return {
    type: REQUEST_QUERY_S3,
    receiving: true,
    //better to have an object to do a name lookup by id
    //but having conflicting logic when trying to handle direct fetch
    //given only ingredient id (no name)
    //queryObj
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

export function fetchSearch3(queryId) {
  return (dispatch) => {
    dispatch(requestQuerySearch3())
    return callApiSearch3(queryId).then(res => {
      dispatch(receiveQuerySearch3(res));
    });
  };
}

export function updatePost(post) {
  return {
    type: UPDATE_POST,
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
    type: ADD_POPULAR_QUERIES,
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

export function updatePostAsync(queryObj) {
  let id = queryObj.rxcui
  console.log('api id: ' + id)
  return (dispatch) => {
    return callApi(`posts/${id}`, 'put', queryObj).then(res => dispatch(updatePost(res.post)));
  };
}


// export function fetchPost(cuid) {
//   return (dispatch) => {
//     return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
//   };
// }

// export function deletePost(cuid) {
//   return {
//     type: DELETE_POST,
//     cuid,
//   };
// }

// export function deletePostRequest(cuid) {
//   return (dispatch) => {
//     return callApi(`posts/${cuid}`, 'delete').then(() => dispatch(deletePost(cuid)));
//   };
// }
