import fetch from 'isomorphic-fetch';
import Config from '../../server/config';

/*
  URL ref
  s1: GET https://rxnav.nlm.nih.gov/REST/drugs.json?name=alavert
  s2: GET https://rxnav.nlm.nih.gov/REST/rxcui/997953/related.json?tty=IN
  s3: GET https://rxnav.nlm.nih.gov/REST/rxcui/28889/related.json?tty=SCD+SBD
*/

export const API_SEARCH_URL_BASE = 'https://rxnav.nlm.nih.gov/REST/'
export const API_SEARCH_URL_MID_S1 = 'drugs.json?name='
export const API_SEARCH_URL_MID_S2 = ['rxcui/', '/related.json?tty=']
export const API_SEARCH_URL_END_S2 = 'IN'
export const API_SEARCH_URL_END_S3 = 'SCD+SBD'

export function callApiSearch1(query, method = 'get') {
  return fetch(`${API_SEARCH_URL_BASE}${API_SEARCH_URL_MID_S1}${query}`, {
    method,
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}

export function callApiSearch2(rxcui, method = 'get') {
  return fetch(`${API_SEARCH_URL_BASE}${API_SEARCH_URL_MID_S2[0]}${rxcui}${API_SEARCH_URL_MID_S2[1]}${API_SEARCH_URL_END_S2}`, {
    method,
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}

export function callApiSearch3(rxcui, method = 'get') {
  return fetch(`${API_SEARCH_URL_BASE}${API_SEARCH_URL_MID_S2[0]}${rxcui}${API_SEARCH_URL_MID_S2[1]}${API_SEARCH_URL_END_S3}`, {
    method,
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}

// TODO CLEAN
export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
  '/api';

export function callApi(endpoint, method = 'get', body) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json' },
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}
