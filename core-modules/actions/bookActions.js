import * as types from './actionTypes';  
import bookApi from '../apiModule/bookApi';
import { push } from 'connected-react-router';

export function createBookRequest(){
  return {type: types.CREATE_BOOK_REQUEST}
}
export function createBookSuccess(payload){
  return {type: types.CREATE_BOOK_SUCCESS, book: payload}
}
export function createBookFailure(error){
  return {type: types.CREATE_BOOK_FAILURE, error: error}
}
export function readBooksIndexRequest(){
  return {type: types.READ_BOOKS_INDEX_REQUEST}
}
export function readBooksIndexSuccess(payload){
  return {type: types.READ_BOOKS_INDEX_SUCCESS, booksList: payload}
}
export function readBooksIndexFailure(error){
  return {type: types.READ_BOOKS_INDEX_FAILURE, error: error}
}

export function updateBookRequest(){
  return {type: types.UPDATE_BOOK_REQUEST}
}

export function updateBookSuccess(){
  return {type: types.UPDATE_BOOK_SUCCESS}
}

export function updateBookFailure(error){
  return {type: types.UPDATE_BOOK_FAILURE, error: error}
}

export function setCurrentBook(payload) {  
  return {type: types.SET_CURRENT_BOOK,book: payload}
}

export function createBook (payload,client){
  return function(dispatch) {
    dispatch(createBookRequest())
    return bookApi.postBook(payload,client).then(response => {
      if (response.error){
        dispatch(createBookFailure(response.message))
      } else {
        dispatch(createBookSuccess(response));
      }
    }).catch(error => {
      dispatch(createBookFailure(error.message));
    });
  }
}

export function readBooksIndex (payload,client){
  return function(dispatch) {
    dispatch(readBooksIndexRequest())
    return bookApi.getBooks(payload,client).then(response => {
      if (response.error){
        dispatch(readBooksIndexFailure(response.message))
      } else {
        dispatch(readBooksIndexSuccess(response))
      }
    }).catch(error => {
      dispatch(readBooksIndexFailure(error.message));
    });
  }
}

export function updateBook (payload, client){
  return function(dispatch) {
    dispatch(updateBookRequest())
    return bookApi.updateBook(payload,client).then(response => {
      if (response.error){
        dispatch(updateBookFailure(response.message))
      } else {
        dispatch(updateBookSuccess(response))
        dispatch(push('/Books'))
      }
    }).catch(error => {
      dispatch(updateBookFailure(error.message));
    });
  } 
}