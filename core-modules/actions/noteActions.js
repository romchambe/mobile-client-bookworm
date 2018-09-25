import * as types from './actionTypes';  
import noteApi from '../apiModule/noteApi';
import { push } from 'connected-react-router';

export function createNoteRequest(){
  return {type: types.CREATE_NOTE_REQUEST}
}
export function createNoteSuccess(payload){
  return {type: types.CREATE_NOTE_SUCCESS, note: payload}
}
export function createNoteFailure(error){
  return {type: types.CREATE_NOTE_FAILURE, error: error}
}
export function readNotesIndexRequest(){
  return {type: types.READ_NOTES_INDEX_REQUEST}
}
export function readNotesIndexSuccess(payload){
  return {type: types.READ_NOTES_INDEX_SUCCESS, notesList: payload}
}
export function readNotesIndexFailure(error){
  return {type: types.READ_NOTES_INDEX_FAILURE, error: error}
}

export function updateNoteRequest(){
  return {type: types.UPDATE_NOTE_REQUEST}
}

export function updateNoteSuccess(){
  return {type: types.UPDATE_NOTE_SUCCESS}
}

export function updateNoteFailure(error){
  return {type: types.UPDATE_NOTE_FAILURE, error: error}
}

export function setCurrentNote(payload) {  
  return {type: types.SET_CURRENT_NOTE, note: payload}
}

export function createNote (payload,client){
  return function(dispatch) {
    dispatch(createNoteRequest())
    return noteApi.postCreateNote(payload,client).then(response => {
      if (response.error){
        dispatch(createNoteFailure(response.message))
      } else {
        dispatch(createNoteSuccess(response));
      }
    }).catch(error => {
      dispatch(createNoteFailure(error.message));
    });
  }
}

export function readNotesIndex (payload,client){
  return function(dispatch) {
    dispatch(readNotesIndexRequest())
    return noteApi.getNotesIndex(payload,client).then(response => {
      if (response.error){
        dispatch(readNotesIndexFailure(response.message))
      } else {
        dispatch(readNotesIndexSuccess(response))
      }
    }).catch(error => {
      dispatch(readNotesIndexFailure(error.message));
    });
  }
}

export function updateNote (payload, client){
  return function(dispatch) {
    dispatch(updateNoteRequest())
    return noteApi.putUpdateNote(payload,client).then(response => {
      if (response.error){
        dispatch(updateNoteFailure(response.message))
      } else {
        dispatch(updateNoteSuccess(response))
        dispatch(push('/notes'))
      }
    }).catch(error => {
      dispatch(updateNoteFailure(error.message));
    });
  } 
}