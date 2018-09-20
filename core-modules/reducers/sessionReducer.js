import * as types from '../actions/actionTypes';  
import initialState from '../initialState';  

const session = (state = initialState, action) => {  
  switch(action.type) {
    case types.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false, loggedIn: true, jwt: action.token
      })
    case types.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false, loggedIn: false, jwt: ''
      })
    case types.LOGOUT:
      return Object.assign({}, state, {
        isFetching: false, loggedIn: false, jwt: ''
      })
    default: 
      return state;
  }
}

export default session