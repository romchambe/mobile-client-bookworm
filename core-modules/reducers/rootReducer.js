import { combineReducers } from 'redux'
import * as types from '../actions/actionTypes';  
import session from './sessionReducer'
import errors from './errorsReducer'
import user from './userReducer'
import books from './booksReducer'
import flow from './flowReducer'
import fetching from './fetchingReducer'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  session, 
  errors,
  user,
  books,
  flow,
  fetching
})



export default rootReducer