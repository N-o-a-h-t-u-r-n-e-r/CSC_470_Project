import { useEffect, useState } from "react";

import { Workout } from "../../Models/Workout";
import { Exercise } from "../../Models/Exercise";
import ExerciseManager from "../../Managers/ExerciseManager";
import ExerciseSearch from "../Shared/ExerciseSearch";
import SetManager from "../../Managers/SetManager";
import { Set } from "../../Models/Set";

interface Props {
    existingWorkout: Workout | undefined,
    setShowExerciseSearch: (showExerciseSearch: boolean) => void;
    onExerciseChange: (exercises: Exercise[]) => void;
}

const WorkoutTable = (props: Props) => {
    const [ exercises, setExercises ] = useState<Exercise[]>([]);
    const [ showExerciseSearch, setShowExerciseSearch ] = useState(false);
    const [ addSetLoading, setAddSetLoading ] = useState(false);

    const exerciseManager = ExerciseManager();
    const setManager = SetManager();

    const handleShowExerciseSearch = (showExerciseSearch: boolean) => {
        setShowExerciseSearch(showExerciseSearch);
        props.setShowExerciseSearch(showExerciseSearch);
    }

    const addSet = () => {
        try {
            return setManager.addSet();
        } catch (error) {
            console.error('Error adding set:', error);
        }
    }

    const handleAddExercise = async (exerciseToAdd: Exercise) => {
        const initialSet = await addSet();
        if (initialSet) {
            exerciseToAdd.SetIDs = initialSet.SetID;
            setExercises(prevExercises => [...prevExercises, exerciseToAdd]);
        }

        setShowExerciseSearch(false);
        props.setShowExerciseSearch(false);
    }

    const handleAddSet = async (exerciseIndex: number) => {
        setAddSetLoading(true);
        const newSet = await addSet();

        var existingExercises = exercises;
        var existingExercise = existingExercises[exerciseIndex];

        existingExercise.SetIDs += `,${newSet?.SetID}`;

        setExercises(existingExercises);
        setAddSetLoading(false);
    }

    useEffect(() => {
        props.onExerciseChange(exercises);
    }, [exercises]);

    return(
        <>
            {showExerciseSearch && <ExerciseSearch setShowExerciseSearch={handleShowExerciseSearch} handleAddExercise={handleAddExercise} />}
            <div className="workout-table-header">
                <h3 className="exercise-column-header">Exercise</h3>
                <h3 className="exercise-column-header">Rep Goal</h3>
                <h3 className="exercise-column-header">Weight Goal</h3>
                <h3 className="exercise-column-header">Completed</h3>
            </div>
            {exercises.map((exercise,exerciseIndex) => (
                <div key={`exercise-${exerciseIndex}`} className="workout-table-row-container">
                    <div className="workout-table-row">
                        <div className="exercise-column">
                            <p className="exercise-title">{exercise.Title}</p>
                        </div>
                        <div className="exercise-column">
                            {exercise.SetIDs.split(',').map((set,setIndex) => (
                                <input key={`exercise-${exercise.Title}-set-input-${setIndex}`} type="number" className="exercise-number-input" placeholder={"12"}></input>
                            ))}
                        </div>
                        <div className="exercise-column">
                            {exercise.SetIDs.split(',').map((set,setIndex) => (
                                <input key={`exercise-${exercise.Title}-rep-input-${setIndex}`} type="number" className="exercise-number-input" placeholder={"100"}></input>
                            ))}
                        </div>
                        <div className="exercise-column">
                            {exercise.SetIDs.split(',').map((set,setIndex) => (
                                <input key={`exercise-${exercise.Title}-copmleted-input-${setIndex}`} type="checkbox" className="exercise-checkbox-input"></input>
                            ))}
                        </div>
                    </div>
                    <div className="workout-table-add-set">
                        <button className="workout-table-add-set-button" disabled={addSetLoading} onClick={() => handleAddSet(exerciseIndex)}>+</button>
                    </div>
                </div>
            ))}
            <div className="add-exercise-button-container">
                <button className="add-exercise-button" onClick={() => handleShowExerciseSearch(true)}>Add Exercise</button>
            </div>
        </>
    );
}

export default WorkoutTable;