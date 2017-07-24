import React from 'react';
import { HashRouter as Router, Route} from 'react-router-dom';
import Splash from './splash'
import SampleRoute from './sample-route';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <Route path="/g/:gistId" component={SampleRoute} />
          <Route path='/' exact={true} component={Splash} />
        </div>
      </Router>
    );
  }
}

export default App;
