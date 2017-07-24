import {createStore} from 'Redux'

let initialState = {
  value: 0
}

function reducer(state = initialState, action){
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
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
