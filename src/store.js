import {createStore} from 'redux'

let initialState = {
  user_input: '',
}

function reducer(state = initialState, action){
  switch (action.type) {
    case 'USER_INPUT':
      return {
        user_input: action.input,
        intervals: action.intervals
      }
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
