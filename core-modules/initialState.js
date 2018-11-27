export default {  
  fetching: false, 
  session: { 
    loggedIn: false, 
    jwt: ''
  },
  errors: [],
  user: { 
    username: '',
    email:'',
    id: ''
  }, 
  books: {
    booksList: [], 
    currentBook: null
  },
  flow: {
    started: false,
    step: null, 
    title: null,
    back: null,
    payload: {},
    from: null
  }
}