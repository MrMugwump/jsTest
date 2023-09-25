'use client'
import Image from 'next/image'
import { Key, useState } from 'react';
import '../app/generateEquation'

export default function Home() {
  const [textInput, setText] = useState('');
  const [enterKey, onEnter] = useState('');
  const [mathEquation, changeEquation] = useState('1+1 = 2');

  const equationGenerator = new EquationGenerator();

  function enterKeyHeard(e: string){
    if(e === 'Enter'){
        onEnter('Enter Key Heard');
    }
    else{
      var code = e;
      onEnter("yessir " + code);
    }
  }
  return (
    <>
      <label>
        Text input: 
        <input 
          name="myInput"
          value = {textInput}
          onChange={e => setText(e.target.value)}
          onKeyDown={e =>
            enterKeyHeard(e.key)}
        />
      </label>
      <hr />
      <label>
        Checkbox: <input type="checkbox" name="myCheckbox" />
      </label>
      <hr />
      <p>
        Radio buttons:
        <hr />
        <label>
          <input type="radio" name="myRadio" value="option1" />
          Option 1
        </label>
        <hr />
        <label>
          <input type="radio" name="myRadio" value="option2" />
          Option 2
        </label>
        <hr />
        <label>
          <input type="radio" name="myRadio" value="option3" />
          Option 3
        </label>
      </p>
      <hr />
      {
        textInput !== '' && 
        <p>Your text input is {textInput}</p>
      }
      <hr />
      { enterKey !== '' &&
        <p>fjjf {enterKey}</p>
      }
      <hr />
      <p>{equationGenerator.getEquation()}</p>
      
    </>
  );
}
