import * as types from './actionTypes';  
import { push } from 'connected-react-router';

// Navigation helpers

export function navigateToBooks (){
  return function(dispatch) {
    dispatch(push('/books'))
  }
}

export function navigateToScan (){
  return function(dispatch) {
    dispatch(push('/scan'))
  }
}

export function navigateToNew (){
  return function(dispatch) {
    dispatch(push('/new'))
  }
}

export function navigateToEdit (){
  return function(dispatch) {
    dispatch(push('/edit'))
  }
}

