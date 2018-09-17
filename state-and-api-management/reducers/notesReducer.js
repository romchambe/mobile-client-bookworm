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
        isFetchingNotes: false, notesList: [...state.notesList, action.note]
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

    default: 
      return state;
  }
}

export default notes