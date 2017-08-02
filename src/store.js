import {createStore} from 'redux'

let initialState = {
  overallTime: 0,
  wpm: 0,
  intervals: [],  
  input: '',
  keys: {},
  matrix: [],
  keyByIndex: new Map(), // <= should be d3.map
  indexByKey: new Map(), 
}

function reducer(state = initialState, action){
  switch (action.type) {
    case 'USER_INPUT':
      return action.data
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}


const store = createStore(
  reducer,
  //need this for REDUX CHROME EXTENSION
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

export default store;
