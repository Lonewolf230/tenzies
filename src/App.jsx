import Die from './Die.jsx'
import './App.css'
import { useState,useEffect} from 'react'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import Stopwatch from './Stopwatch.jsx'

function App() {
    
    const [dice,setDice]=useState(numberdie())
    const [game,setGame]=useState(false);
    const [count,setCount]=useState(0)
    
  useEffect(()=>{
    
    
    let check = true;
    const value = dice[0].value; 

    for(const die of dice){
      if (!(die.value === value && die.selected)) {
        check = false;
        break; 
    }
    }

    if (check) {
        console.log("You won");
        setGame(true); 
    }
 
  },[dice])


    function numberdie(){
      const dicenumbers=[]
      for(let i=0;i<10;i++){
        const obj={
          value:Math.ceil(Math.random()*6),
          selected:false,
          id: nanoid()
        }
        dicenumbers.push(obj)
      }
      return dicenumbers
    }
    
    
    function roll(){
      setDice(prevState=>prevState.map(die=>{
        return !die.selected? {...die, 
                              value:Math.ceil(Math.random()*6),
                              id:nanoid()}: die  
      }))
      setCount(prevCount=>prevCount+1)
    }
    
    function mark(id){
        setDice(prevState=>prevState.map(die=>{
          return die.id===id? {...die,selected:!die.selected}:die
        }))
    }

    function newGame(){
      setDice(numberdie())
      setGame(false)
      setCount(0)
    }

    const displayedDice=dice.map(die=>{
      return <Die key={die.id} id={die.id} value={die.value} selected={die.selected} mark={mark} game={game} setGame={setGame}/>
    })

    return(
      <>
        <main className='main'>
          <h2 className='info'>Tenzies game</h2>
          <p className='info'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className='die-container'>
            {displayedDice}
          </div>

          {game?  <button className='roll-btn' onClick={newGame}>New Game</button>:<button className='roll-btn' onClick={roll}>Roll again</button>}
          {game? <Confetti />:""}
          
          <p className='roll-count'>No of rolls:{count}</p>
          <Stopwatch className="stopwatch"/>
        </main>
      </>
    )
}

export default App
