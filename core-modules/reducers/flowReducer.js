import * as types from '../actions/actionTypes';  
import initialState from '../initialState';  

const flow = (state = initialState, action) => {  
  switch(action.type) {
    case types.START_FLOW:
      return Object.assign({}, state, {
        started: true,
        step: 0,
        title: null
      })

    case types.UPDATE_FLOW:
      return Object.assign({}, state, {
        step: state.step + action.payload.next,
        back: action.payload.back,
        title: action.payload.title
      })  

    case types.TRANSMIT_DATA:
      return Object.assign({}, initialState.flow, action.payload)
        
    case types.CLEAN_FLOW:
      return Object.assign({}, state, initialState.flow)

    case types.READ_BOOK_SUCCESS:
      return Object.assign({}, state, {
        title: action.payload.book.title
      })
    default: 
      return state;
  }
}

export default flow