
import { useState, useEffect} from 'react';
import './App.css';
import Die from "./components/Die"
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const[dice,setDice] =useState(allNewDice())
  const[tenzie,setTenzie]=useState(false)

  useEffect(()=>{
    const allDiceHeld = dice.every(die=> die.isHeld)
    const firstValue= dice[0].value
    const allDiceSame= dice.every(die=> die.value===firstValue)
    if(allDiceHeld && allDiceSame){
      setTenzie(true)
      console.log("you won")
    }
  },[dice])

  function allNewDice(){
    const newDice=[];
    for(let i=0;i<10;i++){
      newDice.push({
        value: Math.ceil(Math.random()*6),
        isHeld: false,
        id: nanoid()
      })
        
    }
    return newDice
  }

  function rollDice(){
    setDice(oldDice => oldDice.map(die=>{
      return die.isHeld ? die :
       {
        value: Math.ceil(Math.random()*6),
        isHeld: false,
        id: nanoid()
       }
    }))
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die=>
      {
        return {
          ...die,
          isHeld: die.id===id ? !die.isHeld : die.isHeld
        }
      }))
  }

  function newGame(){
    setTenzie(false)
    setDice(allNewDice())
  }

  const diceElements = dice.map(die=>
    <Die
      value={die.value} 
      key={die.id} 
      isHeld={die.isHeld}
      holdDice={()=>holdDice(die.id)}
    />                         
    )

  return (
    <div className="outer-box">
      {tenzie && <Confetti/>}
      <div className='inner-box'>
        <h1 className='title'>TENZIES</h1>
        <p className='instructions'>Roll until all the dices are same. Click each die to freeze it at its current between rolls.</p>
            <div className='die-container'>
                {diceElements}
            </div>
            <button onClick={tenzie ? newGame :rollDice} className='roll-button'>
              {tenzie ? "New Game":"Roll"}
            </button>
      </div>
    </div>
  );
}

export default App;
