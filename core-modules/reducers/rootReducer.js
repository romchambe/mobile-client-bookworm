import { combineReducers } from 'redux'
import * as types from '../actions/actionTypes';  
import session from './sessionReducer'
import error from './errorReducer'
import user from './userReducer'
import notes from './notesReducer'
import scanFlow from './scanFlowReducer'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  session, 
  error,
  user,
  notes,
  scanFlow
})



export default rootReducer