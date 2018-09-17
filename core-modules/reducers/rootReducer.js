import { combineReducers } from 'redux'
import session from './sessionReducer'
import error from './errorReducer'
import user from './userReducer'
import notes from './notesReducer'
import scanFlow from './scanFlowReducer'


const rootReducer = combineReducers({
  session, 
  error,
  user,
  notes,
  scanFlow
})

export default rootReducer