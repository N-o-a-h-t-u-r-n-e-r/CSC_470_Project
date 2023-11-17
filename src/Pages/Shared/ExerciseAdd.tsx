import React, { useEffect, useState } from "react";
import ExerciseManager from "../../Managers/ExerciseManager";
import { MUSCLE_GROUPS } from "../../Models/MuscleGroups";
import { Exercise } from "../../Models/Exercise";

interface Props {
    setShowExerciseAdd: (showExerciseAdd: boolean) => void,
    returnExercise: () => void
}

const ExerciseAdd = (props: Props) => {

    const [searchString, setSearchString] = useState("");
    const [loading, setLoading] = useState(true);
    const [exercises, setExercises] = useState([]);

    const [exerciseName, setExerciseName] = useState("");
    const [muscleGroup, setMuscleGroup] = useState("");
    const [description, setDescription] = useState("");

    const exerciseManager = ExerciseManager();

    const handleAddExercise = () => {
       exerciseManager.addExercise(exerciseName, muscleGroup, description).then((result) => {
            if(result){
                console.log(result);   
                props.returnExercise();
            }
       });
    }

    return(
        <div className="exercise-add-box">    
            <button className="exercise-add-button" onClick={() => props.setShowExerciseAdd(false)}>x</button>
            <div>
                <h2>Add New Exercise</h2>
                <div className="exercise-inputs">
                    <label className="exercise-input-label">
                        <span className="exercise-input-label-text" >Name</span> 
                        <input className="exercise-input" type="text" onChange={(e) => setExerciseName(e.target.value)}/>
                    </label>
                    <label className="exercise-input-label">
                        <span className="exercise-input-label-text" >Muscle Group</span> 
                        <select onChange={(e) => setMuscleGroup(e.target.value)} className="exercise-input" required>
                            <option value="">Select an option</option>
                            <option value={MUSCLE_GROUPS.Back}>Back</option>
                            <option value={MUSCLE_GROUPS.Biceps}>Biceps</option>
                            <option value={MUSCLE_GROUPS.Calves}>Calves</option>
                            <option value={MUSCLE_GROUPS.Chest}>Chest</option>
                            <option value={MUSCLE_GROUPS.Core}>Core</option>
                            <option value={MUSCLE_GROUPS.Forearms}>Forearms</option>
                            <option value={MUSCLE_GROUPS.Hamstrings}>Hamstrings</option>
                            <option value={MUSCLE_GROUPS.Quads}>Quads</option>
                            <option value={MUSCLE_GROUPS.Shoulders}>Shoulders</option>
                            <option value={MUSCLE_GROUPS.Triceps}>Triceps</option>
                        </select>
                    </label>
                    <label className="exercise-input-label">
                        <span className="exercise-input-label-text" >Description</span> 
                        <input className="exercise-input" type="text" onChange={(e) => setDescription(e.target.value)}/>
                    </label>
                </div>
                <div className="add-button-container">
                    <button className="add-button" onClick={handleAddExercise}>Add</button>
                </div>
            </div>
        </div>
    );

}
export default ExerciseAdd;