import { useEffect, useState } from "react";

import { Workout } from "../../Models/Workout";
import WorkoutTable from "./WorkoutTable";

interface Props {
    workout?: Workout,
}

const WorkoutInProgress = (props: Props) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((time) => time + 1);
        }, 1000);
    
        return () => {
            clearInterval(interval);
        };
    })

    return(
        <div className="workout-in-progress-container">
            <div className="workout-in-progress-header">
                <h2>Workout</h2>
                <h2 className="timer">{seconds}</h2>
                <button className="end-workout">END</button>
            </div>
            <WorkoutTable existingWorkout={props.workout}/>
        </div>
    );

}

export default WorkoutInProgress;