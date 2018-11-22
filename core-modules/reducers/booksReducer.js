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
        booksList: [...state.booksList, action.book],
        currentBook: action.book
      })
    case types.CREATE_BOOK_FAILURE:
      return Object.assign({}, state, {
        isFetchingBooks: false
      })

    case types.READ_BOOK_REQUEST:
      return Object.assign({}, state, {
        isFetchingBooks: true
      })
    case types.READ_BOOK_SUCCESS:
      return Object.assign({}, state, {
        isFetchingBooks: false, currentBook: action.payload
      })
    case types.READ_BOOK_FAILURE:
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
        isFetchingBooks: false, booksList: action.payload
      })
    case types.READ_BOOKS_INDEX_SUCCESS: 
      return Object.assign({}, state, {
        isFetchingBooks: false
      })

    case types.CLEAN_CURRENT_BOOK: 
    console.log(initialState.books.currentBook)
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