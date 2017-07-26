import React from 'react';
import store from '../../store';

class UserInput extends React.Component {
  constructor(props){
    super(props)

    this.currentTypeInterval = 0
    this.intervals = []
    this.overallTime = 0

    this.onKeyPress = this.onKeyPress.bind(this)
    this.submit = this.submit.bind(this)
  }
  
  onKeyPress(event){
    //start time if they have just begun or if over 60 seconds
    if(this.currentTypeInterval == 0 || this.overallTime == 0){
      this.currentTypeInterval = new Date()
      this.overallTime = new Date()
    } 

    let key = event.key
    if(key != 'Shift' || key != 'CapsLock'){
      let keyObj = {
        key: key,
        beforeInterval: (new Date - this.currentTypeInterval),
        shiftKey: event.shiftKey
      }
      this.currentTypeInterval = new Date()
      this.intervals.push(keyObj)
    } 
  }

  submit(event){
    store.dispatch({
      type: 'USER_INPUT',
      intervals: this.intervals,
      input: event.target.querySelector('textarea.text-input').value
    })

    this.currentTypeInterval = new Date()
    this.overallTime = new Date()
  }

  render(){
    return(
      <div className="user-input">
        <p>Just type something in the text area.</p>
        <form onSubmit={this.submit}>
          <textarea className='text-input' rows='4' cols='50' onKeyPress={this.onKeyPress}>
          </textarea>
          <button type="submit">Submit</button>
        </form>

      </div>
    )
  }
}

export default UserInput



/*
REFERENCE
~~~~~~~~~~~~~~~~~~~~~~~*/
// let interval = 0,
//     intervalID,
//     animationID,
//     result = '',
//     intervals = [],
//     reset = false,
//     target = document.getElementById('result');

// document.getElementById('input').addEventListener('input', function(e){
//   if(intervalID) clearInterval(intervalID)
//   if(reset){ 
//     clearInterval(intervalID)
//     result = ''
//     interval = 0
//     intervals = []
//     reset = false
//   }
//   if(result.length > e.target.value){
    
//   }
  
//   result = e.target.value
//   intervals.push(interval)
//   interval = 0
//   intervalID = setInterval(function(){ interval += 20}, 20)
// })
// document.getElementById('input').addEventListener('keyup', function(e){
//   console.log(e)
// })

// document.getElementById('repeat').addEventListener('click', type)
// document.getElementById('save').addEventListener('click',function(e){
//   console.log(`var intervals = ${JSON.stringify(intervals)}
// var result = ${JSON.stringify(result)}` )
//   reset = true
// })

// function type(){
//   target.innerText = ''
//   var index = 0;
//   function typeLetter(){
//       setTimeout(function(){
//         if(!result[index]) return
//         target.innerText += result[index]
//         index +=1
//         animationID = requestAnimationFrame(typeLetter)
//     }, intervals[index])
//   }
//   typeLetter()
// }
