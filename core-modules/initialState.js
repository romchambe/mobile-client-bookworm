export default {  
  session: { 
    isFetching: false, 
    loggedIn: false, 
    jwt: ''
  },
  errors: [],
  user: { 
    isFetching: false, 
    user: {}
  }, 
  books: {
    isFetchingBooks: false, 
    booksList: [], 
    currentBook: null
  },
  scanFlow: {
    step: 1, 
    isUploadingScan: false, 
    apiResponse: null
  }
}