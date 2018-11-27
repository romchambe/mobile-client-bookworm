import * as types from '../actions/actionTypes';  
import initialState from '../initialState';  

const fetching = (state = initialState, action) => {  
  switch(action.type) {
    case types.LOGIN_REQUEST:
      return true
    case types.LOGIN_SUCCESS:
      return false
    case types.LOGIN_FAILURE:
      return false

    case types.CREATE_USER_REQUEST:
      return true
    case types.CREATE_USER_SUCCESS:
      return false
    case types.CREATE_USER_FAILURE:
      return false

    case types.CREATE_BOOK_REQUEST:
      return true
    case types.CREATE_BOOK_SUCCESS:
      return false
    case types.CREATE_BOOK_FAILURE:
      return false

    case types.READ_BOOK_REQUEST:
      return true
    case types.READ_BOOK_SUCCESS:
      return false
    case types.READ_BOOK_FAILURE:
      return false

    case types.UPDATE_DEPENDENTS_REQUEST:
      return true
    case types.UPDATE_DEPENDENTS_SUCCESS:
      return false
    case types.UPDATE_DEPENDENTS_FAILURE:
      return false

    case types.READ_BOOKS_INDEX_REQUEST: 
      return true
    case types.READ_BOOKS_INDEX_SUCCESS: 
      return false
    case types.READ_BOOKS_INDEX_SUCCESS: 
      return false

    case types.CREATE_QUOTE_REQUEST:
      return true;
    case types.CREATE_QUOTE_FAILURE:
      return false 
    case types.CREATE_QUOTE_SUCCESS:
      return false 

    case types.UPLOAD_SCAN_REQUEST:
      return true
    case types.UPLOAD_SCAN_SUCCESS:
      return false
    case types.UPLOAD_SCAN_FAILURE:
      return false
    
    default: 
      return state;
  }
}

export default fetching