import * as types from '../actions/actionTypes';  
import initialState from '../initialState';  

const books = (state = initialState, action) => {  
  switch(action.type) {

    case types.READ_BOOK_SUCCESS:
      return Object.assign({}, state, {
        currentBook: action.payload
      })
   
    case types.READ_BOOKS_INDEX_SUCCESS: 
      return Object.assign({}, state, {
        booksList: action.payload
      })


    case types.CLEAN_CURRENT_BOOK: 
      return Object.assign({}, state, {
        currentBook: initialState.books.currentBook
      })

    case types.LOGOUT:
      return Object.assign({}, state, {
        booksList: [],
        currentBook: {}
      })
    default: 
      return state;
  }
}

export default books