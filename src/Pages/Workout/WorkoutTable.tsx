import { useEffect, useState } from "react";

import { Workout } from "../../Models/Workout";
import { Exercise } from "../../Models/Exercise";
import ExerciseManager from "../../Managers/ExerciseManager";
import ExerciseSearch from "../Shared/ExerciseSearch";

interface Props {
    existingWorkout: Workout | undefined,
    setShowExerciseSearch: (showExerciseSearch: boolean) => void;
}

const WorkoutTable = (props: Props) => {

    const [ workout, setWorkout ] = useState(props.existingWorkout);
    const [ exercises, setExercises ] = useState<Exercise[]>([]);
    const [ showExerciseSearch, setShowExerciseSearch ] = useState(false);

    const exerciseManager = ExerciseManager();

    const handleShowExerciseSearch = (showExerciseSearch: boolean) => {
        setShowExerciseSearch(showExerciseSearch);
        props.setShowExerciseSearch(showExerciseSearch);
    }

    return(
        <>
            {showExerciseSearch && <ExerciseSearch setShowExerciseSearch={handleShowExerciseSearch} />}
            <div className="workout-table-header">
                <h3 className="exercise-column-header">Exercise</h3>
                <h3 className="exercise-column-header">Rep Goal</h3>
                <h3 className="exercise-column-header">Weight Goal</h3>
                <h3 className="exercise-column-header">Completed</h3>
            </div>
            <div className="workout-table-row-container">
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
                <div className="workout-table-add-set">
                    <button className="workout-table-add-set-button">+</button>
                </div>
            </div>

            <div className="add-exercise-button-container">
                <button className="add-exercise-button" onClick={() => handleShowExerciseSearch(true)}>Add Exercise</button>
            </div>
        </>
    );
}

export default WorkoutTable;