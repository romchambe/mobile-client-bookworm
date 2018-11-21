import * as types from '../actions/actionTypes';  
import initialState from '../initialState';  

const flow = (state = initialState, action) => {  
  switch(action.type) {
    case types.START_FLOW:
      console.log(state)
      return Object.assign({}, state, {
        started: true,
        step: 0,
      })
    case types.UPDATE_FLOW:
      console.log(action)
      return Object.assign({}, state, {
        step: state.step + action.payload.next,
        back: action.payload.back,
        title: action.payload.title
      })  
    case types.CLEAN_FLOW:
      console.log(state)
      return Object.assign({}, state, initialState.flow)
    default: 
      return state;
  }
}

export default flow