import React from 'react';

class Project extends React.Component {
  constructor(){
    super()
    this.state = {}
  }
  render(){
    return (<h1>Route: {this.props.match.params.gistId + 10}</h1>)
  }
}

export default Project