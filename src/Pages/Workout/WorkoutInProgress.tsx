import { useEffect, useState } from "react";

import { Workout } from "../../Models/Workout";
import WorkoutTable from "./WorkoutTable";
import WorkoutCompletedReport from "../Reports/WorkoutCompletedReport"
import { Exercise } from "../../Models/Exercise";

interface Props {
    workout?: Workout,
}

const WorkoutInProgress = (props: Props) => {
    const [seconds, setSeconds] = useState(0);
    const [timerRunning, setTimerRunning] = useState(true);
    const [workout, setWorkout] = useState(props.workout);
    const [showWorkoutCompletedReport, setShowWorkoutCompletedReport] = useState(false);
    const [showExerciseSearch, setShowExerciseSearch] = useState(false);
    const [ exercises, setExercises ] = useState<Exercise[]>([]);
    const [workoutCompleted, setWorkoutCompleted] = useState(false);

    useEffect(() => {
        if(timerRunning){
            const interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timerRunning]);
    const handleEndWorkout = () => {
        stopTimer();
        setShowWorkoutCompletedReport(true);
        setWorkoutCompleted(true);
    }
    const stopTimer = () => {
        setTimerRunning(false);
    };
    const handleExercisesChange = (exercises: Exercise[]) =>{
        setExercises(exercises);
        console.log('Updated exercises:', exercises);
    };



    return(
        <>
            <div className={`container workout-in-progress-container ${showExerciseSearch ? 'unclickable' : ''}`} >
                <div className="header workout-in-progress-header">
                    <h2>Workout</h2>
                    <h2 className="timer">{new Date(seconds * 1000).toISOString().slice(11, 19)}</h2>
                    <button className="end-workout" onClick={handleEndWorkout}>END</button>
                        
                </div>
                <div className="body">
                    <WorkoutTable 
                        existingWorkout={props.workout} 
                        setShowExerciseSearch={setShowExerciseSearch}
                        onExerciseChange={handleExercisesChange}
                    />
                </div>
            </div>
            
            {workoutCompleted && (
                <WorkoutCompletedReport
                    pr={null}
                    workout={props.workout}
                    exercises={exercises}
                    time={seconds}
                    trigger={showWorkoutCompletedReport}
                    setTrigger={setShowWorkoutCompletedReport}
                />
            )}
        </>
    );

}

export default WorkoutInProgress;