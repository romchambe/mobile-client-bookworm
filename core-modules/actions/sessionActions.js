import * as types from './actionTypes';  
import sessionApi from '../apiModule/sessionApi';
import { APP_ID } from 'react-native-dotenv';

import { push } from 'connected-react-router';
import { Facebook } from 'expo';


export function loginRequest() {
  return {type: types.LOGIN_REQUEST};
}
export function loginSuccess(payload) {  
  return {type: types.LOGIN_SUCCESS, user: payload.user, token: payload.jwt}
}

export function loginFailure(error) {  
  return {type: types.LOGIN_FAILURE, error: error}
}

export function logout() {
  return {type: types.LOGOUT};
}

export function loginUser(credentials,client) {  
  return function(dispatch) {
    dispatch(loginRequest());
    return sessionApi.postLogin(credentials,client).then(response => { 
      dispatch(loginSuccess({user: response.user, jwt: response.jwt}));
      dispatch(push('/'));
    }).catch(error => {
      console.log(JSON.stringify(error));
      dispatch(loginFailure(error));
    });
  };
}

export function logoutUser() {  
  return function(dispatch) {
    dispatch(logout());
  }
}

// Social login handling

export function fbLoginUser(client) {
  return async function(dispatch){
    dispatch(loginRequest());
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(APP_ID);

    // FB Graph API Request in case user successfully authed
    var fbUser = {};
    if (type === 'success') {
      fbUser = await sessionApi.getFbUserInfo(token).then(response => {
        return response;
      })
    } else {
      dispatch(loginFailure(type));
    }
    
    // request JWT to Rails API like in the normal flow
    if (fbUser.email){
      return sessionApi.postFbLogin(fbUser,client).then(response => {
        dispatch(loginSuccess({user: response.user, jwt: response.jwt}));
        dispatch(push('/'));
      }).catch(error => {
        dispatch(loginFailure(error))
      })
    }
  }
}
