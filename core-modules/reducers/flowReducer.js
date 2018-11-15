import * as types from '../actions/actionTypes';  
import initialState from '../initialState';  

const flow = (state = initialState, action) => {  
  switch(action.type) {
    case types.UPLOAD_SCAN_REQUEST:
      return Object.assign({}, state, {
        isUploadingScan: true
      })
    case types.UPLOAD_SCAN_SUCCESS:
      return Object.assign({}, state, {
        step: 2,
        isUploadingScan: false,
        apiResponse: action.uri
      })  
    case types.UPLOAD_SCAN_FAILURE:
      return Object.assign({}, state, {
        step: 1,
        isUploadingScan: false

      })
    case types.INCREMENT_STEP:
      return Object.assign({}, state, {
        step: state.step + 1
      })
    case types.CLEAN_SCAN_FLOW:
      return Object.assign({}, state, {
        step: 1,
        isUploadingScan: false,
        apiResponse: ''
      }) 
    case types.LOGOUT:
      return Object.assign({}, state, {
        step: 1,
        isUploadingScan: false,
        apiResponse: ''
      }) 
    default: 
      return state;
  }
}

export default flow