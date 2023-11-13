import { useEffect, useState } from "react";

import { Workout } from "../../Models/Workout";
import { Exercise } from "../../Models/Exercise";
import ExerciseManager from "../../Managers/ExerciseManager";

interface Props {
    existingWorkout: Workout | undefined,
}

const WorkoutTable = (props: Props) => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const exerciseManager = ExerciseManager();

    useEffect(() => {
        console.log(props.existingWorkout);
        if(props.existingWorkout !== undefined){
            setExercises(exerciseManager.GetExercisesFromIDString(props.existingWorkout.Exercise_IDs))
        }
    }, [props.existingWorkout])

    return(
        <>
            <div className="workout-table-header">
                <h3 className="exercise-column-header">Exercise</h3>
                <h3 className="exercise-column-header">Rep Goal</h3>
                <h3 className="exercise-column-header">Weight Goal</h3>
                <h3 className="exercise-column-header">Completed</h3>
            </div>

            <div className="workout-table-row">
                <div className="exercise-column">
                    <p className="exercise-title">Squat (3 x 12)</p>
                </div>
                <div className="exercise-column">
                    <input type="number" className="exercise-number-input" placeholder={"12"}></input>
                    <input type="number" className="exercise-number-input" placeholder={"12"}></input>
                    <input type="number" className="exercise-number-input" placeholder={"12"}></input>
                </div>
                <div className="exercise-column">
                    <input type="number" className="exercise-number-input" placeholder={"100"}></input>
                    <input type="number" className="exercise-number-input" placeholder={"100"}></input>
                    <input type="number" className="exercise-number-input" placeholder={"100"}></input>
                </div>
                <div className="exercise-column">
                    <input type="checkbox" className="exercise-checkbox-input"></input>
                    <input type="checkbox" className="exercise-checkbox-input"></input>
                    <input type="checkbox" className="exercise-checkbox-input"></input>
                </div>
            </div>

            <div className="add-exercise-button-container">
                <button className="add-exercise-button">Add Exercise</button>
            </div>
        </>
    );

}

export default WorkoutTable;