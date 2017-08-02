import React from 'react'
import store from '../../store'
import * as d3 from 'd3'

class UserInput extends React.Component {
  constructor(props){
    super(props)

    this.currentTypeInterval = 0
    this.keyList = {}
    this.intervals = []
    this.overallTime = 0
    this.prev = undefined

    this.onKeyDown = this.onKeyDown.bind(this)
    this.submit = this.submit.bind(this)
    this.createMatrix = this.createMatrix.bind(this)
    // this.getStats = this.getStats.bind(this)
  } // /constructor
  
  onKeyDown(event){
    //start time if they have just begun or if over 60 seconds
    if(this.currentTypeInterval === 0 || this.overallTime === 0){
      this.currentTypeInterval = new Date()
      this.overallTime = new Date()
    } 

    let key = event.key
    if(key.match(/Arrow/)){
      //TODO
      //KEEP TRACK OF THE CURSOR
    }
    if(key !== 'Shift' || key !== 'CapsLock'){
      let char = key.toLowerCase()
      //create Key if it doesnt exist in list
      if(!this.keyList[char]) this.keyList[char] = new Key(char)
      //increment and add prev interval
      this.keyList[char].addInstance()
      this.keyList[char].addBefore(this.prev)
      //create new interval
      let int = new Interval(this.keyList[char], new Date() - this.currentTypeInterval)
      //add interval to prev's after
      if(this.prev) this.prev.key.addAfter(this.keyList[char])
      //set new interval to prev
      this.prev = int
      // save and reset
      this.intervals.push(int)
      this.currentTypeInterval = new Date()
    }
  } // /onKeyDown

  submit(event){
    event.preventDefault()
    this.overallTime = new Date() - this.overallTime
    let input = event.target.querySelector('textarea.text-input').value
    event.target.querySelector('textarea.text-input').value = ''
    let matrixAndMaps = this.createMatrix(this.keyList)
    let data = {
      overallTime: this.overallTime,
      wpm: input.split(' ').length * 60 / (this.overallTime /1000),
      intervals: this.intervals,  
      input: input,
      keys: this.keyList,
      matrix: matrixAndMaps.matrix,
      keyByIndex: matrixAndMaps.keyByIndex,
      indexByKey: matrixAndMaps.indexByKey
    }
    this.createMatrix(this.keyList)
    
    store.dispatch({type: 'USER_INPUT', data: data})
    this.overallTime = 0
    this.currentTypeInterval = 0
  } // /submit
  
  createMatrix(keys){
    var matrix = []
    var keyByIndex = d3.map()
    var indexByKey = d3.map()
    var n = 0

    //create map
    for(let letter in keys){
      if(!indexByKey.has(letter)){
        keyByIndex.set(n, letter) 
        indexByKey.set(letter, n)
        n += 1
      }
    }

    //create matrix
    for(let curLetter in keys){
      let keyObj = keys[curLetter]
      let index = indexByKey.get(curLetter)
      let row = matrix[index]
      if(!row){
        row = matrix[index] = []
        for (var i = 0; i < n; i++) row[i] = 0;
      } 
      // only doing keys before right now
      keyObj.keysBefore.forEach((intervalObj)=>{
        if(!intervalObj) return
        let targetIndex = indexByKey.get(intervalObj.key.key)
        row[targetIndex] += 1
      })
    }
    return {matrix, keyByIndex, indexByKey}
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
  } // / render
}


const hands = {
      left: ["a","s","d","f","g","q","w","e","r","t","z","x","c","v","b","1","2","3","4","5","`","!","@","#","$","%","~"],
      right: ["y","u","i","o","p","0","9","8","7","6","h","j","k","l",";","'","ENTER","n","m",",",".","/","?",">","<",":","\"","{","}","|","+","_",")","(","*","&","^","[","]","\\","=","-"]
    }
class Key {
  constructor(key){
    this.frequency = 0
    this.key = key
    this.hand = this.determineHand(key)
    
    this.keysBefore = []
    this.keysAfter = []
  }
  determineHand(l){
    if(l === ' ' || l === 'SHIFT') return 'EITHER'
    return hands.left.indexOf(l) > -1 ? 'LEFT' : 'RIGHT'
  }

  addInstance(interval){
    this.frequency += 1
  }
  addBefore(interval){
    this.keysBefore.push(interval)
  }
  addAfter(interval){
    this.keysAfter.push(interval)
  }
}

class Interval {
  constructor(key, time){
    this.key = key
    this.time = time
  }
}

export default UserInput
