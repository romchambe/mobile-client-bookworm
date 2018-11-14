import { combineReducers } from 'redux'
import * as types from '../actions/actionTypes';  
import session from './sessionReducer'
import errors from './errorsReducer'
import user from './userReducer'
import books from './booksReducer'
import scanFlow from './scanFlowReducer'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  session, 
  errors,
  user,
  books,
  scanFlow
})



export default rootReducer