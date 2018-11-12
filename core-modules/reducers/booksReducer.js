import * as types from '../actions/actionTypes';  
import initialState from '../initialState';  

const books = (state = initialState, action) => {  
  switch(action.type) {
    case types.CREATE_BOOK_REQUEST:
      return Object.assign({}, state, {
        isFetchingBooks: true
      })
    case types.CREATE_BOOK_SUCCESS:
      return Object.assign({}, state, {
        isFetchingBooks: false, 
        BooksList: [...state.booksList, action.book],
        currentBook: action.book
      })
    case types.CREATE_BOOK_FAILURE:
      return Object.assign({}, state, {
        isFetchingBooks: false
      })
    case types.UPDATE_BOOK_REQUEST:
      return Object.assign({}, state, {
        isFetchingBooks: true
      })
    case types.UPDATE_BOOK_SUCCESS:
      return Object.assign({}, state, {
        isFetchingBooks: false
      })
    case types.UPDATE_BOOK_FAILURE:
      return Object.assign({}, state, {
        isFetchingBooks: false
      })
    case types.READ_BOOKS_INDEX_REQUEST: 
      return Object.assign({}, state, {
        isFetchingBooks: true
      })
    case types.READ_BOOKS_INDEX_SUCCESS: 
      return Object.assign({}, state, {
        isFetchingBooks: false, booksList: action.booksList
      })
    case types.READ_BOOKS_INDEX_SUCCESS: 
      return Object.assign({}, state, {
        isFetchingBooks: false
      })
    case types.SET_CURRENT_BOOK:
      return Object.assign({}, state, {
        currentBook: action.book
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