import { useEffect, useState } from "react";

import { Workout } from "../../Models/Workout";
import WorkoutTable from "./WorkoutTable";
import WorkoutCompletedReport from "../Reports/WorkoutCompletedReport"

interface Props {
    workout?: Workout,
}

const WorkoutInProgress = (props: Props) => {
    const [seconds, setSeconds] = useState(0);
    const [workout, setWorkout] = useState(props.workout);
    const [showWorkoutCompletedReport, setShowWorkoutCompletedReport] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return(
        <>
            <div className="container workout-in-progress-container">
                <div className="header workout-in-progress-header">
                    <h2>Workout</h2>
                    <h2 className="timer">{seconds}</h2>
                    <button className="end-workout">END</button>
                </div>
                <div className="body">
                    <WorkoutTable existingWorkout={props.workout}/>
                </div>
            </div>
            {/* {showWorkoutCompletedReport && <WorkoutCompletedReport  />} */}
        </>
    );

}

export default WorkoutInProgress;