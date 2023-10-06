import React from "react"
import { useState, useEffect } from 'react';
import "./timerStyle.css"

const ProgressBar = ({ progress }:any) => ( 
    <div className="progressbar">
      <div className="progress" style={{ width: `${progress}%`}}>
      </div>
    </div>
  )

const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;



export default function TimerModule({deadline, timerLength, interval, timeEnded}:any){
    let ourDeadline = deadline;
    let ourTimerLength = timerLength;
    let ourInterval = interval;
    let ourTimeEnded = timeEnded;
    var date = new Date(ourDeadline);
    const [timespan,setTimespan] = useState(ourTimerLength + date.getTime() - Date.now());
    useEffect(()=>{
        const intervalId = setInterval(()=>{
            setTimespan((_timespan)=>{
                if(_timespan < 0){
                  return timerLength;
                }
                else{
                  return _timespan - interval*0.1;
                }
            });
        }, ourInterval*0.1);

        return () => {clearInterval(intervalId)}
        
    },[ourInterval]);

    useEffect(()=>{
        setTimespan(-1);
        // return ()=>setTimespan(-21);
    },[timeEnded]);

    return(
        <><p>{timespan} + {timeEnded}</p></>
    );
}

// code adapted from https://dev.to/yuridevat/how-to-create-a-timer-with-react-7b9 
export function useTimer(deadline:Date, timerLength:number, interval = SECOND) {
    //let timeEnded = timeEnd()
    let timeL = timerLength;
    let date  = new Date(deadline);
    const [timespan, setTimespan] = useState(timerLength+date.getTime()- Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
        setTimespan((_timespan) => {
            if(_timespan<0){
                return timeL; //resets the timer if time finishes
            }
            else{
                return(_timespan-0.1*interval) //decrements the time
            }
        });
    }, 0.1*interval); //interval = time between updates for useEffect in milliseconds

    return () => {
      clearInterval(intervalId);
    };
  }, [interval]); //triggers every time interval changes? we aren't changing the interval so idk

  return {
    seconds: (timespan/ SECOND)
  };
}
