import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import Timer from "./Timer"
import Controls from "./Controls"
import Button from "./Button"

function Pomodoro() {

  const [focusTime, setFocusTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)
  const [currentMode, setCurrentMode] = useState('Focusing')
  const [remainingTime, setRemainingTime] = useState(1500)
  const [controlsDisabled, setControlsDisabled] = useState(false)
  const [stopDisabled, setStopDisabled] = useState(true)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isStopped, setIsStopped] = useState(true)
  const boop = new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`)

  useInterval(() => {
     setRemainingTime(remainingTime - 1)
     if (remainingTime <= 0) {
      boop.play()
      if (currentMode === "Focusing") {
        setCurrentMode("On Break") 
        setRemainingTime(breakTime * 60)
      } else if (currentMode === "On Break") {
        setCurrentMode("Focusing")
        setRemainingTime(focusTime * 60)
      }
     }
   },
   isTimerRunning ? 1000 : null
   )

   const handleReset = () => {
    setCurrentMode("Focusing")
    setFocusTime(25)
    setBreakTime(5)
    setRemainingTime(1500)
    setStopDisabled(true)
    setIsTimerRunning(false)
    setIsStopped(true)
    setControlsDisabled(false)
  }

  const playPause = () => {
    setStopDisabled(false)
    setIsStopped(false)
    setIsTimerRunning((current) => !current)
    setControlsDisabled(true)
  }

  
 
  return (
    <div>
      <Controls focusTime={focusTime} setFocusTime={setFocusTime} setRemainingTime={setRemainingTime} breakTime={breakTime} setBreakTime={setBreakTime} controlsDisabled={controlsDisabled} />
    
      <Button playPause={playPause} classNames={classNames} isTimerRunning={isTimerRunning} handleReset={handleReset} stopDisabled={stopDisabled} />
    
      <Timer focusTime={focusTime} breakTime={breakTime} remainingTime={remainingTime} isTimerRunning={isTimerRunning} isStopped={isStopped} currentMode={currentMode} />
    
      <audio src={boop} type="audio/mp3"></audio>
    </div>
  )

}

export default Pomodoro;