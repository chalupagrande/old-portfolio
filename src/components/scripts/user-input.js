import React from 'react';
import store from '../../store';

class UserInput extends React.Component {
  constructor(props){
    super(props)

    this.currentTypeInterval = 0
    this.intervals = []
    this.overallTime = 0

    this.onKeyDown = this.onKeyDown.bind(this)
    this.submit = this.submit.bind(this)
    this.getStats = this.getStats.bind(this)
  }
  
  onKeyDown(event){
    //start time if they have just begun or if over 60 seconds
    if(this.currentTypeInterval == 0 || this.overallTime == 0){
      this.currentTypeInterval = new Date()
      this.overallTime = new Date()
    } 

    let key = event.key
    if(key.match(/Arrow/)){
      //TODO:
      //HANDLE CURSOR DIRECTION
    }
    if(key !== 'Shift' || key !== 'CapsLock'){
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
    event.preventDefault()

    this.currentTypeInterval = new Date()
    this.overallTime = new Date() - this.overallTime
    let data = {
      overallTime: this.overallTime,
      intervals: this.intervals,
      input: event.target.querySelector('textarea.text-input').value
    }
    let stats = this.getStats(data)

    store.dispatch(Object.assign({type: 'USER_INPUT'}, data))
    this.overallTime = 0
  }
  
  render(){
    return(
      <div className="user-input">
        <p>Just type something in the text area.</p>
        <form onSubmit={this.submit}>
          <textarea className='text-input' rows='4' cols='50' onKeyDown={this.onKeyDown}>
          </textarea>
          <button type="submit">Submit</button>
        </form>

      </div>
    )
  }

  /*
    Helpers
  ~~~~~~~~~~~~~~~~~ */
  getStats(data){
  
    let wordsArray = data.input.slice(' ')
    let charArray = data.input.slice('')
    let seconds = data.overallTime / 1000 
    let wpm = wordsArray.length * 60 / seconds

    let list = {}
    let prev = undefined

    for(var i = 0; i < data.intervals.length; i++){
      let int = data.intervals[i]
      int.from = prev
      let char = int.key.toLowerCase()
      if(list[char]){
        list[char].addInstance(int)        
      } else {
        list[char] = new Key(char, int)
      }
      prev = list[char]
    }
    console.log(list)
    return {wpm, list}
  }
}





const hands = {
      left: ["a","s","d","f","g","q","w","e","r","t","z","x","c","v","b","1","2","3","4","5","`","!","@","#","$","%","~"],
      right: ["y","u","i","o","p","0","9","8","7","6","h","j","k","l",";","'","ENTER","n","m",",",".","/","?",">","<",":","\"","{","}","|","+","_",")","(","*","&","^","[","]","\\","=","-"]
    }
class Key {
  constructor(key, interval){
    this.frequency = 1
    this.key = key
    this.hand = this.determineHand(key)
    this.intervals = [interval]
  }
  determineHand(l){
    if(l === ' ' || l === 'SHIFT') return 'EITHER'
    return hands.left.indexOf(l) > -1 ? 'LEFT' : 'RIGHT'
  }
  addInstance(interval){
    this.frequency += 1
    this.intervals.push(interval)
  }
}

export default UserInput
