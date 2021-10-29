import React from "react";
import { secondsToDuration, minutesToDuration } from "../utils/duration";

function Timer({ focusTime, breakTime, isTimerRunning, isStopped, currentMode, remainingTime  }) {
    const paused = isTimerRunning ? '' : 'PAUSED'
    const currentTimer = (currentMode === 'Focusing' ? focusTime : breakTime)
    const percent = ((currentTimer * 60 - remainingTime) / (currentTimer * 60)) * 100

    if (!isStopped) {
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <h2 data-testid="session-title">{currentMode} for {minutesToDuration(currentTimer)} minutes</h2>
                        <p className="lead" data-testid='session-sub-title'>{secondsToDuration(remainingTime)} remaining</p>
                    </div>
            </div>
                <h2>{paused}</h2>
                <div className="row">
                    <div className="col">
                        <div className="progress" style={{ height: "20px"}}>
                            <div className="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={percent} style={{ width: `${percent}%`}}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }

}
export default Timer;