import React from "react"
import { useState, useEffect } from 'react';
import "./timerStyle.css"

const ProgressBar = ({ progress }:any) => ( 
    <div className="progressbar">
      <div className="progress" style={{ width: `${progress}%`}}>
      </div>
    </div>
  )

const TimerModule = ({timeLength}:any) => {
    const [timerLength, setTimerLength] = useState(timeLength); // time length needs to be in milliseconds
    const [timeInitial, setInitialTime] = useState(0);
    var count = 0;
    useEffect(() => {
        count+=100;
        const interval = setInterval(() => timerLength, 100);
        console.log("hfh");
        if (count >  timerLength){
            return () => clearInterval(interval);
        }
      }, []); // absolutely no idea if this will work

      return(
        <><ProgressBar progress={((timerLength-count)/timerLength)*1000}/></>
      );

}


const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

// code copied from https://dev.to/yuridevat/how-to-create-a-timer-with-react-7b9 
export default function useTimer(deadline:Date, interval = SECOND) {
    let date  = new Date(deadline);
    const [timespan, setTimespan] = useState(date.getTime()- Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimespan((_timespan) => _timespan - interval);
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval]);

  /* If the initial deadline value changes */
  useEffect(() => {
    let date  = new Date(deadline);
    setTimespan(date.getDate() - Date.now());
  }, [deadline]);

  return {
    days: Math.floor(timespan / DAY),
    hours: Math.floor((timespan / HOUR) % 24),
    minutes: Math.floor((timespan / MINUTE) % 60),
    seconds: Math.floor((timespan / SECOND) % 60)
  };
}