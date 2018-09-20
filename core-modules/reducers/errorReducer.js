import * as types from '../actions/actionTypes';  
import { LOCATION_CHANGE } from 'connected-react-router';

const error = (state = [], action) => {  
  switch(action.type) {
    case types.LOGIN_FAILURE:
      return [
        ...state,
        action.error.message
      ]
    case types.CREATE_USER_FAILURE:
      return [
        ...state,
        action.error.message
      ]
    case types.UPLOAD_SCAN_FAILURE:
      return [
        ...state,
        action.error.message
      ]
    case types.UPDATE_NOTE_FAILURE:
      return [
        ...state,
        action.error.message
      ]
    case LOCATION_CHANGE:
      return [];
    default: 
      return state;
  }
}

export default error