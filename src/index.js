import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/scripts/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

ReactDOM.render(<App />, document.getElementById('root'));

let unsubsribe = store.subscribe((a,b)=>{
  console.log('change',a,b)
})

registerServiceWorker();


