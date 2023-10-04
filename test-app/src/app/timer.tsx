import React from "react"
import { useState, useEffect } from 'react';
import "./timerStyle.css"

const ProgressBar = ({ progress }:any) => ( 
    <div className="progressbar">
      <div className="progress" style={{ width: `${progress}%`}}>
      </div>
    </div>
  )

const timerModule = (timeLength:number) => {
    const [timerLength, setTimerLength] = useState(timeLength); // time length needs to be in milliseconds
    const [timeInitial, setInitialTime] = useState(0);
    var count = 0;
    useEffect(() => {
        count+=100;
        const interval = setInterval(() => timerLength, 100);
        if (count >  timerLength){
            return () => clearInterval(interval);
        }
      }, []); // absolutely no idea if this will work

      return(
        <><ProgressBar progress={((timerLength-count)/timerLength)*1000}/></>
      );

}

export default timerModule;