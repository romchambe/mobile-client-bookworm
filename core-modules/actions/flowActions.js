import * as types from './actionTypes';  


export function startFlow(payload){
  return {type: types.START_FLOW, payload: payload}
}

export function updateFlow(payload){
  return {type: types.UPDATE_FLOW, payload: payload}
}

export function cleanFlow(payload){
  return {type: types.CLEAN_FLOW, payload: payload}
}
