export default {  
  session: { 
    isFetching: false, 
    loggedIn: false, 
    jwt: ''
  },
  errors: [],
  user: { 
    isFetching: false, 
    username: '',
    email:'',
    id: ''
  }, 
  books: {
    isFetchingBooks: false, 
    booksList: [], 
    currentBook: null
  },
  flow: {
    started: false,
    step: null, 
    title: null,
    back: null
  }
}