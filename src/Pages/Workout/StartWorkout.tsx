import { useState } from "react";

import WorkoutInProgress from "./WorkoutInProgress";

interface Props {

}

const StartWorkout = (props: Props) => {
    const [displayWorkoutInProgress, setDisplayWorkoutInProgress] = useState(false);

    return(
        <>
            {displayWorkoutInProgress && <WorkoutInProgress />}
            <div className="start-workout-container">
                <div className="start-workout-header">
                
                </div>
                <div className="start-workout-body">
                    <button onClick={() => setDisplayWorkoutInProgress(!displayWorkoutInProgress)}>CLICK ME</button>
                </div>
                <div className="start-blank-workout-button">
                    
                </div>
            </div>
        </>
    );

}

export default StartWorkout;