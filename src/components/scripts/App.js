import React from 'react';
import { HashRouter as Router, Route} from 'react-router-dom';
import Splash from './splash'
import Project from './project';
import Edge from './edge';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="router">
          <Route path='/' exact={true} component={Splash} />
          <Route path="/g/:gistId" component={Project} />
          <Route path='/edge' component={Edge} />

        </div>
      </Router>
    );
  }
}

export default App;
