import { useEffect, useState } from "react";

import { Workout } from "../../Models/Workout";
import WorkoutTable from "./WorkoutTable";
import WorkoutCompletedReport from "../Reports/WorkoutCompletedReport"
import { Exercise } from "../../Models/Exercise";
import { useNavigate } from "react-router-dom";
import { CompletedSet } from "../../Models/CompletedSet";
import ExerciseManager from "../../Managers/ExerciseManager";
import SetManager from "../../Managers/SetManager";
import { useAuth0 } from "@auth0/auth0-react";
import WorkoutManager from "../../Managers/WorkoutManager";

interface Props {
    workout?: Workout,
}

const WorkoutInProgress = (props: Props) => {
    const [seconds, setSeconds] = useState(0);
    const [timerRunning, setTimerRunning] = useState(true);

    const [workout, setWorkout] = useState(props.workout);
    const [ exercises, setExercises ] = useState<Exercise[]>([]);
    const [ completedSets, setCompletedSets ] = useState<{SetIndex: number, ExerciseIndex: number, Reps: number, Weight: number}[]>([]);

    const [workoutCompleted, setWorkoutCompleted] = useState(false);
    const [showWorkoutCompletedReport, setShowWorkoutCompletedReport] = useState(false);
    const [showExerciseSearch, setShowExerciseSearch] = useState(false);

    const navigate = useNavigate();
    const exerciseManager = ExerciseManager();
    const setManager = SetManager();
    const workoutManager = WorkoutManager();
    const { user } = useAuth0();

    useEffect(() => {
        if(timerRunning){
            const interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timerRunning]);

    const handleEndWorkout = async () => {
        stopTimer();

        let exercisesWithSets = [] as Exercise[];
        let completedSetsWithRepWeight = [] as {SetIndex: number, ExerciseIndex: number, Reps: number, Weight: number}[];


        exercises.forEach((e, index) => {
            let hasCompletedSets = false;
            completedSets.forEach(s => {
                if(s.ExerciseIndex === index && s.Reps !== undefined && s.Weight !== undefined){
                    hasCompletedSets = true;
                    completedSetsWithRepWeight.push(s);
                }
            })

            if(hasCompletedSets)
             exercisesWithSets.push(e);
        })

        let NewExerciseIDs = "";

        for (let index = 0; index < exercisesWithSets.length; index++) {
            const x = exercisesWithSets[index];
    
            try {
                let exerciseID = "";

                await exerciseManager.addCompletedExercise(x).then((result) => {
                    exerciseID = result!;
                });
    
                if (NewExerciseIDs === "") {
                    NewExerciseIDs = exerciseID!;
                } else {
                    NewExerciseIDs = NewExerciseIDs + ',' + exerciseID;
                }
    
                const exerciseSets = completedSetsWithRepWeight.filter(
                    cs => cs.ExerciseIndex === index
                );
                    
                for (const s of exerciseSets) {                   
                    const completedSet = {
                        ForExerciseID: exerciseID,
                        Set: {
                            NumberReps: s.Reps,
                            Weight: s.Weight
                        }
                    } as CompletedSet;
    
                    await setManager.addSet(completedSet);                  
                }
            } catch (error) {
                console.error("Error adding exercise/set: ", error);
            }
        }

        const newWorkout = {
            UserID: user?.sub,
            Date: new Date(),
            ExerciseIDs: NewExerciseIDs,
            TimeElapsed: seconds,
        } as unknown as Workout;

        workoutManager.addCompletedWorkout(newWorkout).then((result) => {
            newWorkout.WorkoutID = result!;
        });

        setWorkout(newWorkout);
        setShowWorkoutCompletedReport(true);
        setWorkoutCompleted(true);
    }
    
    const stopTimer = () => {
        setTimerRunning(false);
    };

    const handleWorkouotCompleted = () => {
        setShowWorkoutCompletedReport(false);
        navigate('/');
    }

    return(
        <>
            <div className={`container workout-in-progress-container ${showExerciseSearch ? 'unclickable' : ''}`} >
                <div className="header workout-in-progress-header">
                    <h2>Workout</h2>
                    <h2 className="timer">{new Date(seconds * 1000).toISOString().slice(11, 19)}</h2>
                    <button className="end-workout" onClick={handleEndWorkout}>END</button>
                </div>
                <div className="body">
                    <WorkoutTable existingWorkout={workout} setExercises={(Exercises: Exercise[]) => setExercises(Exercises)} setCompletedSets={(CompletedSets: {SetIndex: number, ExerciseIndex: number, Reps: number, Weight: number}[]) => setCompletedSets(CompletedSets)} setShowExerciseSearch={setShowExerciseSearch} />
                </div>
            </div>
            
            {workoutCompleted && <WorkoutCompletedReport pr={null} workout={workout} time={seconds} handleClose={handleWorkouotCompleted} />}
        </>
    );

}

export default WorkoutInProgress;