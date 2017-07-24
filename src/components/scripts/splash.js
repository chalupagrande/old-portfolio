import React from 'react';
import '../styles/splash.css';
import {Link} from 'react-router-dom';

class Splash extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      things: [1,2,3,4]
    }
  }

  render(){
    return(
      <div className="wrapper">
        <div className="portrait">
          <img className="me" src="assets/me-blue.png" alt=""/>
          <img className="me" src="assets/me-red.png" alt=""/>
          <img className="me" src="assets/me-green.png" alt=""/>
        </div>
        <ul>
          {this.state.things.map((e, i)=> <Link to={`/g/${i}`} key={i}> <li>{e}</li> </Link>)}
        </ul>
      </div>
    )
  }
}

export default Splash