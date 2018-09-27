import * as types from './actionTypes';  
import { push } from 'connected-react-router';

// Navigation helpers

export function navigateToNotes (){
  return function(dispatch) {
    dispatch(push('/notes'))
  }
}

export function navigateToScan (){
  return function(dispatch) {
    dispatch(push('/scan'))
  }
}

export function navigateToEdit (){
  return function(dispatch) {
    dispatch(push('/edit'))
  }
}

export function navigateToTest (){
  return function(dispatch) {
    dispatch(push('/test'))
  }
}