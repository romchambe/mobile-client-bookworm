import * as types from '../actions/actionTypes';  
import initialState from '../initialState';  

const user = (state = initialState, action) => {  
  switch(action.type) {
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, action.user)
    
    case types.LOGOUT:
      return Object.assign({}, initialState.user)

    default: 
      return state;
  }
}

export default user