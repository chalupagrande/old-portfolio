import React from 'react';
import { HashRouter as Router, Route} from 'react-router-dom';
import Splash from './splash'
import Project from './project';
import Edge from './edge';
import Ribbons from './ribbons';
import store from '../../store';


class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="router">
          <Route path='/' exact={true} component={Splash} />
          <Route path="/g/:gistId" component={Project} />
          <Route path='/edge' component={Edge} />
          <Route path='/ribbons' render={(props)=>{
            return(<Ribbons  {...props} matrix={store.getState().matrix}
              keyByIndex={store.getState().keyByIndex}
              indexByKey={store.getState().indexByKey}  
            />)
          }}
           
          />

        </div>
      </Router>
    );
  }
}

export default App;
