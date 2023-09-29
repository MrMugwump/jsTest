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
  
  columns.push(<td>{equationGenerator.firstVar}</td>);
  columns.push(<td>{equationGenerator.operation}</td>);
  columns.push(<td>{equationGenerator.secondVar}</td>);

  function generateEquation(){
    equationGenerator.generateEquation();
    columns.push(<td>{equationGenerator.firstVar}</td>);
    columns.push(<td>{equationGenerator.operation}</td>);
    columns.push(<td>{equationGenerator.secondVar}</td>);
    useState();
    //changeEquation(equationGenerator.getEquation()); //it needs a useState somewhere in order to know to run this
  }

  return(<>
    <tbody>
      <tr>
        {columns}
        <td>=</td>
        <td><AnswerInput equationGenerator={generateEquation}/></td>
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
      <EquationDisplay/>
    </>
  );
}
