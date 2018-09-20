import * as types from '../actions/actionTypes';  
import initialState from '../initialState';  

const notes = (state = initialState, action) => {  
  switch(action.type) {
    case types.CREATE_NOTE_REQUEST:
      return Object.assign({}, state, {
        isFetchingNotes: true
      })
    case types.CREATE_NOTE_SUCCESS:
      return Object.assign({}, state, {
        isFetchingNotes: false, 
        notesList: [...state.notesList, action.note],
        currentNote: action.note
      })
    case types.CREATE_NOTE_FAILURE:
      return Object.assign({}, state, {
        isFetchingNotes: false
      })
    case types.UPDATE_NOTE_REQUEST:
      return Object.assign({}, state, {
        isFetchingNotes: true
      })
    case types.UPDATE_NOTE_SUCCESS:
      return Object.assign({}, state, {
        isFetchingNotes: false
      })
    case types.UPDATE_NOTE_FAILURE:
      return Object.assign({}, state, {
        isFetchingNotes: false
      })
    case types.READ_NOTES_INDEX_REQUEST: 
      return Object.assign({}, state, {
        isFetchingNotes: true
      })
    case types.READ_NOTES_INDEX_SUCCESS: 
      return Object.assign({}, state, {
        isFetchingNotes: false, notesList: action.notesList
      })
    case types.READ_NOTES_INDEX_SUCCESS: 
      return Object.assign({}, state, {
        isFetchingNotes: false
      })
    case types.SET_CURRENT_NOTE:
      return Object.assign({}, state, {
        currentNote: action.note
      })
    case types.LOGOUT:
      return Object.assign({}, state, {
        notesList: [],
        currentNote: {}
      })
    default: 
      return state;
  }
}

export default notes