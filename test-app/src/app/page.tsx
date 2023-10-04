'use client'
import Image from 'next/image'
import { Key, useState } from 'react';
import { EquationGenerator } from './generateEquation';

/**
 * Contains answerInput in hierarchy
 * This allows answerInput to get shuffled around
 */
function EquationDisplay({}){ 
  const equationGenerator = new EquationGenerator();
  const [mathEquation, changeEquation] = useState(String(equationGenerator.generateOperation()));

  const columns = [];

  let thing = <td><AnswerInput equationGenerator={generateEquation}/></td>;
  
  columns.push(<td>{equationGenerator.firstVar}</td>);
  columns.push(<td>{equationGenerator.operation}</td>);
  columns.push(<td>{equationGenerator.secondVar}</td>);
  columns.push(<td>=</td>);
  columns.push(thing);

  function generateEquation(){
    useState();
    equationGenerator.generateEquation();
    
    let x = generateRandomInteger(0,3);
    columns.push(<td>{equationGenerator.firstVar}</td>);
    columns.push(<td>{equationGenerator.operation}</td>);
    columns.push(<td>{equationGenerator.secondVar}</td>);
    columns.push(<td>=</td>);
    columns.push(<td>{equationGenerator.answer}</td>);
    if(x==3){
      columns[x+1] = thing;
    }
    else{
      columns[x] = thing;
    }

    
    
    //changeEquation(equationGenerator.getEquation()); //it needs a useState somewhere in order to know to run this
  }

  return(<>
    <tbody>
      <tr>
        {columns}
      </tr>
    </tbody>
    <p></p> {/*will likely store these in a list so that the order of things is easily moved around*/}

  </>);

}

function AnswerInput({ equationGenerator }:any){
  function keyDetect(e: string){
    if( e == 'Enter'){
      equationGenerator();
    }
  }

  return(<><input 
    name="answer"
    className='answerInput'
    onKeyDown={e => keyDetect(e.key)}
  /> 
  </>);
}

export default function Home() {
  const [textInput, setText] = useState('');
  const [enterKey, onEnter] = useState('');
  const [mathEquation, changeEquation] = useState('1+1 = 2');


  const equationGenerator = new EquationGenerator();

  function enterKeyHeard(e: string){
    if(e == 'Enter'){
        //equationGenerator.generateOperation();
        onEnter('Enter Key Heard');
        console.log("what");
        changeEquation(equationGenerator.getEquation());
    }
    else{
      onEnter("Enter Key Not Heard");
    }
  }
  return (
    <>

      <hr/>
      <button className='button button1'>skdjfhsdk</button>
      <hr/>
      <button className="button button2">sdlfkjsdlfkj</button>
    </>
  );
}

function generateRandomInteger(min: number, max: number){ // Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  min = Math.ceil(min);
  max = Math.floor(max)+1; //+1 to make max inclusive inclusive
  return Math.floor(Math.random() * (max - min) + min); // The maximum and the minimum are inclusive
    
}