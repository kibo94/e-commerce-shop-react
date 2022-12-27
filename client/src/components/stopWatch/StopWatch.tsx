import React from 'react'
interface StopWatch {
  seconds:number,
  miliseconds:number
  minutes:number
}
function StopWatch({seconds,miliseconds,minutes}:StopWatch) {
  return (
    <div className="StopWatch">
        <span>{minutes >= 10 ? minutes : `0${minutes}`}</span>
        <span>:{seconds >= 10 ? seconds : `0${seconds}`}</span>
        <span>:{miliseconds >= 10 ? miliseconds : `0${miliseconds}`}</span>
    </div>
  )
}

export default StopWatch