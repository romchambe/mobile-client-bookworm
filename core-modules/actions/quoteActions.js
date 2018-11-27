import * as types from './actionTypes';  
import quoteApi from '../apiModule/quoteApi';


export function createQuoteRequest(){
  return {type: types.CREATE_QUOTE_REQUEST}
}
export function createQuoteSuccess(payload){
  return {type: types.CREATE_QUOTE_SUCCESS, payload: payload}
}
export function createQuoteFailure(error){
  return {type: types.CREATE_QUOTE_FAILURE, error: error}
}
export function createQuote(payload,client){
  return function(dispatch) {
    dispatch(createQuoteRequest())
    return quoteApi.postQuote(payload,client).then(response => {
      if (response.error){
        dispatch(createQuoteFailure(response.message))
      } else {
        dispatch(createQuoteSuccess(response));
      }
    }).catch(error => {
      dispatch(createQuoteFailure(error.message));
    });
  }
}