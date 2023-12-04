import React, { useEffect, useState } from 'react'
import { Workout } from "../../Models/Workout";
import { Exercise } from "../../Models/Exercise";
import { Set } from '../../Models/Set';
import SetManager from '../../Managers/SetManager';
import ExerciseManager from '../../Managers/ExerciseManager';
import UserExerciseRecordManager from '../../Managers/UserExerciseRecordManager';



interface Props {
    workout?: Workout;
    time: number;
    handleClose: () => void;
}

const WorkoutCompletedReport = (props: Props) => {
    const setManager = SetManager();
    const exerciseManager = ExerciseManager();
    const userExerciseRecordManager = UserExerciseRecordManager();
    const [userData, setUserData] = useState<Exercise[] | null>(null);
    const [prsResults, setPrsResults] = useState<string[][] | null>(null);

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

                        const sets = await setManager.getSets(exerciseId.trim());

                        const prResults = await Promise.all(
                            sets.map(async (set) => userExerciseRecordManager.PRanator(exercise?.ExerciseID ? exercise.ExerciseID.trim() : '', set.NumberReps, set.Weight))
                        );
                        sets.forEach((set, index) => {
                            set.prResults = prResults[index];
                        });


                        setPrsResults((prevResults) => (prevResults ? [...prevResults, prResults] : [prResults]));


                        return { ...exercise, sets };
                    })
                );

                const filteredUserExercises = userExercises.filter((exercise) => {
                    return (
                        exercise !== undefined &&
                        exercise.sets !== undefined &&
                        exercise.sets.length > 0
                    );
                }) as Exercise[];
                console.log(filteredUserExercises);
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

                {userData !== null && userData.length > 0 ?

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

                {userData !== null ?

                    <div className="reports-exercise-list">
                        <div className="reports-exercise-pr">
                            <p>PRs set:</p>
                        </div>
                        {userData.map((exercise, index) => {
                            const exercisePrSet = exercise.sets.some((set: Set, setIndex: number) => {
                                const prResult = prsResults && prsResults[index] && prsResults[index][setIndex];
                                return prResult !== "None";
                            });

                            return (
                                <ul key={index}>
                                    <div className="pr-info">
                                        {exercisePrSet && <div className="pr-title">{exercise.Title}:</div>}
                                        <div className="pr-content">
                                            {exercise.sets.map((set: Set, setIndex: number) => {
                                                const prResult = prsResults && prsResults[index] && prsResults[index][setIndex];
                                                if (prResult !== "None") {
                                                    return (
                                                        <div key={setIndex}>
                                                            {set.NumberReps} x {set.Weight} : {prResult}
                                                        </div>
                                                    );
                                                } else {
                                                    return null; // Don't render if PR result is "None"
                                                }
                                            })}
                                        </div>
                                    </div>
                                </ul>
                            );
                        })}
                    </div>
                    : <div className="list-title">None</div>
                }

            </div>
        </div>
    );
}

export default WorkoutCompletedReport;

