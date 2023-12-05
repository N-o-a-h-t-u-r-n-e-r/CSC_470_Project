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
    const [prData, setPrData] = useState<Exercise[] | null>(null);
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
                        const exercise = await exerciseManager.getCompletedExercisebyID(exerciseId.trim());

                        const sets = await setManager.getCompletedSets(exerciseId.trim());

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
                setUserData(filteredUserExercises);

                //grouping all sets by exerciseID
                const groupedExercises: { [key: string]: Exercise } = {};
                filteredUserExercises.forEach((exercise) => {
                    const exerciseId = exercise?.ExerciseID || '';
                    if (!groupedExercises[exerciseId]) {
                        groupedExercises[exerciseId] = { ...exercise, sets: [] };
                    }
                    groupedExercises[exerciseId].sets = [
                        ...groupedExercises[exerciseId].sets,
                        ...exercise.sets,
                    ];
                });
                const uniqueFiltered = Object.values(groupedExercises);

                const filteredExercises = uniqueFiltered
                    .map((exercise) => {
                        const highestReps = Math.max(...exercise.sets.map((set: Set) => set.NumberReps));
                        const highestWeight = Math.max(...exercise.sets.map((set: Set) => set.Weight));

                        exercise.sets = exercise.sets
                            .map((set: Set) => {
                                if (set.NumberReps === highestReps && set.Weight === highestWeight && set.prResults === 'Both') {
                                    return { ...set };
                                }

                                if (set.NumberReps === highestReps && set.prResults === 'Both') {
                                    set.prResults = 'Volume';
                                }

                                if (set.Weight === highestWeight && set.prResults === 'Both') {
                                    set.prResults = 'Weight';
                                }

                                return set;
                            })
                            .filter((set: Set) => set.NumberReps === highestReps || set.Weight === highestWeight)
                            .filter((set: Set) => set.prResults !== 'None'); // Filter out sets with prResults 'None'

                        return exercise;
                    })
                    .filter((exercise) => exercise.sets.length > 0); // Filter out exercises with no sets

                setPrData(filteredExercises)
                console.log("Should be empty:", filteredExercises)




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

                {prData !== null && prData.length > 0 ?

                    <div className="reports-exercise-list">
                        <div className="reports-exercise-pr">
                            <p>PRs set:</p>
                        </div>
                        {prData.map((exercise, index) => (
                            <ul key={index}>
                                {exercise.sets.some((set: Set) => set.prResults !== "None") && (
                                    <div className="pr-info">
                                        <div className="pr-title">{exercise.Title}:</div>
                                        <div className="pr-content">
                                            {exercise.sets.map((set: Set, setIndex: number) => {
                                                if (set.prResults !== "None") {
                                                    return (
                                                        <div key={setIndex}>
                                                            {set.NumberReps} x {set.Weight} : {set.prResults}
                                                        </div>
                                                    );
                                                } else {
                                                    return null;
                                                }
                                            })}
                                        </div>
                                    </div>
                                )}
                            </ul>

                        ))}





                    </div>
                    : <div className="list-title"></div>
                }

            </div>
        </div>
    );
}

export default WorkoutCompletedReport;

