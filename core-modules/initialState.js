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
  notes: {
    isFetchingNotes: false, 
    notesList: [], 
    currentNote: null
  },
  scanFlow: {
    step: 1, 
    isUploadingScan: false, 
    apiResponse: null
  }
}