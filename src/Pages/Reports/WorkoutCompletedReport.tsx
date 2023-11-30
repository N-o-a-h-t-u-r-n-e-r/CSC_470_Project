import React, { useEffect, useState } from 'react'
import { Workout } from "../../Models/Workout";
import { Exercise } from "../../Models/Exercise";
import { Set } from '../../Models/Set';
import SetManager from '../../Managers/SetManager';
import ExerciseManager from '../../Managers/ExerciseManager';


interface Prs {
    title: string;
    volume: number;
    weight: number;
    category: string;
}

interface Props {
    workout?: Workout;
    time: number;
    handleClose: () => void;
    pr: Prs[] | null;
}

const WorkoutCompletedReport = (props: Props) => {
    const setManager = SetManager();
    const exerciseManager = ExerciseManager()
    const [userData, setUserData] = useState<Exercise[] | null>(null);


    useEffect(() => {
        const fetchUserExercises = async () => {
            try {

                // For testing purposes
                const dummyExerciseIDs = ['I7tZY7B6Gdy2GWV167SL', 'rjlIJaWIb6SaJ4ggZefX'];

                // dummyvalue or get ExerciseIDs from workout if its available.
                const exerciseIds = props.workout?.ExerciseIDs ? props.workout.ExerciseIDs.split(',') : dummyExerciseIDs;

                const userExercises = await Promise.all(
                    exerciseIds.map(async (exerciseId) => {
                        const exercise = await exerciseManager.getExercisebyID(exerciseId.trim());
                        console.log("this is what's getting searched:", exerciseId);

                        // Fetch sets for each exercise
                        const setIds = exercise?.SetIDs.split(',') || [];
                        const sets = await Promise.all(setIds.map(async (setId) => {
                            return setManager.getSets(setId.trim());
                        }));

                        return { ...exercise, sets };              
                    })
                );

                console.log('User exercises:', userExercises);
                const filteredUserExercises = userExercises.filter((exercise) => exercise !== undefined) as Exercise[];
                setUserData(filteredUserExercises);
            } catch (error) {
                console.error('Error fetching user exercises:', error);
            }
        };

        fetchUserExercises();
        
    }, [props.workout]);


    return (
        <div className="reports-popup-box">
            <div className="reports-box">
                <button className="reports-workout-button" onClick={() => props.handleClose()}> X </button>
                <div className="reports-header">
                    <h1>{props.workout?.Title !== undefined ? `Workout "${props.workout?.Title}" completed!` : "Workout Completed"}</h1>
                </div>
                <div className="reports-divider"></div>

                <div className="reports-time-left">
                    <p>Time:</p>
                </div>

                <div className="reports-time-right">
                    <p>{new Date(props.time * 1000).toISOString().slice(11, 19)}</p>
                </div>

                <div className="reports-exercise-list-header">
                    <p>Exercises Completed:</p>
                </div>

                {userData !== null ?
                    <div className="reports-exercise-list">
                        {userData.map((exercise, index) => (
                            <ul key={index}>
                                <div className="exercise-info">
                                    <div className="list-title">{exercise.Title}:</div>
                                    <div className="setsNreps">
                                        {exercise.sets.map((set: Set, setIndex: number) => (
                                            <div key={setIndex}>
                                                {set.NumberReps} x {set.Weight}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ul>
                        ))}
                    </div>
                    :
                    <div className="list-title">None</div>
                }

                {props.pr !== null && props.pr.length > 0 &&
                    <>
                        <div className="reports-exercise-pr">
                            <p>PRs set:</p>
                        </div>
                        {props.pr.map((prs, index) => (
                            <ul key={index}>

                                <div className="pr-info">
                                    <div className="pr-title">
                                        {prs.title}:
                                    </div>
                                    <div className="pr-content">
                                        {prs.weight}lb x {prs.volume} - {prs.category}
                                    </div>
                                </div>
                            </ul>
                        ))}

                    </>
                }
            </div>
        </div>
    );
}

export default WorkoutCompletedReport;

