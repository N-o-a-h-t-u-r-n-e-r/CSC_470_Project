import { useState } from "react";

import WorkoutInProgress from "./WorkoutInProgress";

interface Props {

}

const StartWorkout = (props: Props) => {
    const [displayWorkoutInProgress, setDisplayWorkoutInProgress] = useState(false);

    return(
        <>
            {displayWorkoutInProgress ?
                <WorkoutInProgress />
            :
                <div className="start-workout-container">
                    <div className="start-workout-header">
                        <h1>Start Workout</h1>
                    </div>
                    <div className="start-workout-body">
                        
                    </div>
                    <div className="start-blank-workout-button">
                        <button onClick={() => setDisplayWorkoutInProgress(!displayWorkoutInProgress)}>Start Blank Workout</button>
                    </div>
                </div>
            }
        </>
    );

}

export default StartWorkout;