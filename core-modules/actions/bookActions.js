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

export function readBookRequest(){
  return { type: types.READ_BOOK_REQUEST}
}
export function readBookSuccess(payload){
  return { type: types.READ_BOOK_SUCCESS, payload: payload }
}
export function readBookFailure(error){
  return { type: types.READ_BOOK_FAILURE, error: error}
}

export function readBooksIndexRequest(){
  return {type: types.READ_BOOKS_INDEX_REQUEST}
}
export function readBooksIndexSuccess(payload){
  return {type: types.READ_BOOKS_INDEX_SUCCESS, payload: payload}
}
export function readBooksIndexFailure(error){
  return {type: types.READ_BOOKS_INDEX_FAILURE, error: error}
}

export function updateDependentsRequest(){
  return {type: types.UPDATE_DEPENDENTS_REQUEST}
}
export function updateDependentsSuccess(payload){
  return {type: types.UPDATE_DEPENDENTS_SUCCESS, payload: payload}
}
export function updateDependentsFailure(error){
  return {type: types.UPDATE_DEPENDENTS_FAILURE, error: error}
}

export function cleanCurrentBook(){
  return {type: types.CLEAN_CURRENT_BOOK}
}

export function createBook (payload,client){
  return function(dispatch) {
    dispatch(createBookRequest())
    return bookApi.postBook(payload,client).then(response => {
      if (response.error){
        dispatch(createBookFailure(response.message))
      } else {
        dispatch(createBookSuccess(response));
        dispatch(push('/books'))
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
        dispatch(readBooksIndexSuccess(response.booksList))
      }
    }).catch(error => {
      dispatch(readBooksIndexFailure(error.message));
    });
  }
}

export function readBook(payload,client){
  return function(dispatch){
    dispatch(readBookRequest())
    return bookApi.getBook(payload, client).then(response => {
      if (response.error){
        dispatch(readBookFailure(response.message))
      } else {
        dispatch(readBookSuccess(response))
      }
    }).catch(error => {
      dispatch(readBookFailure(error.message));
    });
  }
}

export function updateDependents (payload, client){
  return function(dispatch) {
    dispatch(updateDependentsRequest())
    return bookApi.updateDependents(payload,client).then(response => {
      if (response.error){
        dispatch(updateDependentsFailure(response.message))
      } else {
        dispatch(updateDependentsSuccess(response))
      }
    }).catch(error => {
      dispatch(updateDependentsFailure(error.message));
    });
  } 
}