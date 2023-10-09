import React from "react"
import { useState, useEffect } from 'react';
import "./timerStyle.css"

function ProgressBar2({progress,interval = SECOND, transitionFunction = 'linear'}:any){ //hopefully gives me an instant transition
  if(interval==0){
    return(<>
      <div className="progressbar">
        <div className="progress">
        </div>
      </div>
    </>);
  }
  else {
    <>
    
    <hr/>
    <div className="progressbar">
      <div className="progress" style={{ 
        height: `${progress}%`,
        transitionDuration: `${interval}ms`,
        transitionTimingFunction: `${transitionFunction}`
        }}>
      </div>
    </div>
    <div><p>{interval}</p></div>
    
    </>
  }
}

const ProgressBar = ({ progress, interval }:any) => ( 
    <div className="progressbar">
      <div className="progress" style={{ 
        height: `${progress}%`,
        transitionDuration: `${interval}ms`,
        }}>
      </div>
    </div>
  )
const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;



export default function TimerModule({timerLength, interval, timeEnded}:any){
    const [timespan,setTimespan] = useState(timerLength);
    const [keyID,setKeyID] = useState(0);
    useEffect(()=>{
      const intervalId = setInterval(()=>{
          setTimespan((_timespan: number)=>{
              if(_timespan <= 0){
                setKeyID((_keyID)=>_keyID+1);
                return timerLength;
              }
              else{
                return _timespan - interval*0.1;
              }
          });
      }, interval*0.1);

      return () => {clearInterval(intervalId)}
      
    },[interval]);

    useEffect(()=>{
        setKeyID((_keyID)=>_keyID+1);
        setTimespan(timerLength);
    },[timeEnded]);

    return(
        <>
          <p>{timespan/SECOND}</p>
          <hr/>
          <ProgressBar 
            key = {keyID}
            progress={10*timespan/SECOND}
            interval={interval}
            />
        </>
    );
}

// code adapted from https://dev.to/yuridevat/how-to-create-a-timer-with-react-7b9 
export function useTimer(deadline:Date, timerLength:number, interval = SECOND) {
    //let timeEnded = timeEnd()
    let timeL = timerLength;
    let date  = new Date(deadline);
    const [timespan, setTimespan] = useState(timerLength);

  useEffect(() => {
    const intervalId = setInterval(() => {
        setTimespan((_timespan) => {
            if(_timespan<=0){
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
