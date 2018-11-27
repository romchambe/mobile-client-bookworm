import * as types from '../actions/actionTypes';  
import { LOCATION_CHANGE } from 'connected-react-router';

const error = (state = [], action) => {  
  switch(action.type) {
    case types.LOGIN_FAILURE:
      return [
        ...state,
        action.error
      ]

    case types.CREATE_USER_FAILURE:
      return [
        ...state,
        action.error
      ]

    case types.CREATE_BOOK_FAILURE:
      return [
        ...state,
        action.error
      ]

    case types.READ_BOOK_FAILURE:
      return [
        ...state,
        action.error
      ]

    case types.READ_BOOKS_INDEX_FAILURE:
      return [
        ...state,
        action.error
      ]

    case types.CREATE_QUOTE_FAILURE:
      return [
        ...state,
        action.error
      ]

    case types.UPLOAD_SCAN_FAILURE:
      return [
        ...state,
        action.error
      ]
      
    case types.UPDATE_DEPENDENTS_FAILURE:
      return [
        ...state,
        action.error
      ]
    case LOCATION_CHANGE:
      return [];
    default: 
      return state;
  }
}

export default error