import React from 'react';
import '../styles/splash.css';
import UserInput from './user-input';
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
        <ul>
          {this.state.things.map((e, i)=> <Link to={`/g/${i}`} key={i}> <li>{e}</li> </Link>)}
        </ul>
        <UserInput/>
      </div>
    )
  }
}

export default Splash