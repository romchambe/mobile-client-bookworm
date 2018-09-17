import * as types from './actionTypes';  
import scanApi from './../apiModule/scanApi';


export function uploadScanRequest(){
  return {type: types.UPLOAD_SCAN_REQUEST}
}

export function uploadScanSuccess(payload){
  return {type: types.UPLOAD_SCAN_SUCCESS, uri: payload}
}

export function uploadScanFailure(payload){
  return {type: types.UPLOAD_SCAN_FAILURE, error: payload}
}

export function postScan (payload,client){
  return function(dispatch) {
    dispatch(uploadScanRequest())
    return scanApi.postScan(payload,client).then(response => {
      dispatch(uploadScanSuccess(response));
    }).catch(error => {
      dispatch(uploadScanFailure(error));
    });
  }
}

export function incrementStep() {
  return {type: types.INCREMENT_STEP};
}

export function cleanScanFlow() {
  return {type: types.CLEAN_SCAN_FLOW};
}




