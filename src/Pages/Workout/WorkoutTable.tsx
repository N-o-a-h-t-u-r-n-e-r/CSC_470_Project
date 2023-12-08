import { useState, useEffect } from "react";

import { Workout } from "../../Models/Workout";
import { Exercise } from "../../Models/Exercise";
import ExerciseManager from "../../Managers/ExerciseManager";
import ExerciseSearch from "../Shared/ExerciseSearch";
import SetManager from "../../Managers/SetManager";
import { ExerciseWithSet } from "../../Models/ExerciseWithSet";
import { Set } from "../../Models/Set";

interface Props {
    existingWorkout: Workout | undefined,
    setShowExerciseSearch: (ShowExerciseSearch: boolean) => void,
    setExercises: (Exercises: ExerciseWithSet[]) => void,
    setCompletedSets: (CompletedSets: {SetIndex: number, ExerciseIndex: number, Reps: number, Weight: number}[]) => void,
}

const WorkoutTable = (props: Props) => {
    const [ exercises, setExercises ] = useState<ExerciseWithSet[]>([]);
    const [ reps, setReps ] = useState<{SetIndex: number, ExerciseIndex: number, Reps: number}[]>([]);
    const [ weights, setWeights ] = useState<{SetIndex: number, ExerciseIndex: number, Weight: number}[]>([]);
    const [ completedSets, setCompletedSets ] = useState<{SetIndex: number, ExerciseIndex: number, Reps: number, Weight: number}[]>([]);
    const [ showExerciseSearch, setShowExerciseSearch ] = useState(false);
    const [ addCompletedSetLoading, setaddCompletedSetLoading ] = useState(false);

    const exerciseManager = ExerciseManager();
    const setManager = SetManager();

    const handleShowExerciseSearch = (ShowExerciseSearch: boolean) => {
        setShowExerciseSearch(ShowExerciseSearch);
        props.setShowExerciseSearch(ShowExerciseSearch);
    }

    const handleMarkSetCompleted = (checked: boolean, SetIndex: number, ExerciseIndex: number) => {
        let newCompletedSets = [];
        
        if(checked && exercises[ExerciseIndex].Sets[SetIndex].NumberReps && exercises[ExerciseIndex].Sets[SetIndex].Weight){
            newCompletedSets = [...completedSets, { SetIndex: SetIndex, ExerciseIndex: ExerciseIndex, Reps: exercises[ExerciseIndex].Sets[SetIndex].NumberReps, Weight: exercises[ExerciseIndex].Sets[SetIndex].Weight}];
        } else {
            let existingSets = completedSets;
            existingSets.splice(completedSets.findIndex(x => x.SetIndex === SetIndex), 1);
            newCompletedSets = existingSets;
        }

        setCompletedSets(newCompletedSets);
        props.setCompletedSets(newCompletedSets);
    }
    
    const handleAddExercise = (exerciseToAdd: Exercise) => {
        console.log("Does it have an exerciseID?", exerciseToAdd)
        const newExerciseWithSets = {
            Title: exerciseToAdd.Title,
            Description: exerciseToAdd.Description,
            Date: exerciseToAdd.Date,
            MuscleGroup: exerciseToAdd.MuscleGroup,
            Sets: [{NumberReps: 12, Weight: 100}],
            ExerciseID: exerciseToAdd.ExerciseID
        } as unknown as ExerciseWithSet;
        const newExercises = [...exercises, newExerciseWithSets];
        setExercises(newExercises);
        props.setExercises(newExercises);
        handleShowExerciseSearch(false);
    }

    const handleaddCompletedSet = (exerciseIndex: number) => {
        console.log(exercises[exerciseIndex])
        const currentSetIDs = exercises[exerciseIndex].Sets;
        const newSetID = {NumberReps: 12, Weight: 100} as Set;
        const newSetIDs = [...currentSetIDs, newSetID];
        
        let newExercises = exercises;
        let updatedExercise = newExercises[exerciseIndex];
        console.log(updatedExercise.Sets);
        updatedExercise.Sets = newSetIDs;
        console.log(newSetIDs);
        setExercises(newExercises);
    }

    const handleSetReps = (SetIndex: number, ExerciseIndex: number, Reps: number) => {
        const idx = reps.findIndex(x => x.SetIndex === SetIndex && x.ExerciseIndex === ExerciseIndex);

        let newExercises = exercises;
        newExercises[ExerciseIndex].Sets[SetIndex].NumberReps = Reps;
        setExercises(newExercises);
        
        if(idx === -1){
            const newReps = [...reps, {SetIndex: SetIndex, ExerciseIndex: ExerciseIndex, Reps: Reps}];
            setReps(newReps);
        } else {
            let newReps = reps;
            newReps[idx].Reps = Reps;
            setReps(newReps);
        }
    }
     
     const handleSetWeights = (SetIndex: number, ExerciseIndex: number, Weight: number) => {
        const idx = weights.findIndex(x => x.SetIndex === SetIndex && x.ExerciseIndex === ExerciseIndex);

        let newExercises = exercises;
        newExercises[ExerciseIndex].Sets[SetIndex].Weight = Weight;
        setExercises(newExercises);

        if(idx === -1){
            const newWeights = [...weights, {SetIndex: SetIndex, ExerciseIndex: ExerciseIndex, Weight: Weight}];
            setWeights(newWeights);
        } else {
            let newWeights = weights;
            newWeights[idx].Weight = Weight;
            setWeights(newWeights);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (props.existingWorkout) {
                let newExercises: ExerciseWithSet[] = [];
                try {
                    const exerciseIDs = props.existingWorkout.ExerciseIDs.split(',').map(id => id.trim());
    
                    const exercisePromises = exerciseIDs.map(async trimmedID => {
                        console.log('getting with id: ' + trimmedID);
                        let newExerciseWithSets: ExerciseWithSet | undefined = undefined;
                        try {
                            const globalExercise = await exerciseManager.getGlobalExercisebyID(trimmedID);
                            const userExercise = await exerciseManager.getUserExercisebyID(trimmedID);
    
                            if (globalExercise) {
                                const setPromises = globalExercise.SetID.map(async id => {
                                    try {
                                        const set = await setManager.getGlobalSetbyID(id);
                                        return set;
                                    } catch (error) { }
                                });
                            
                                const fetchedSets = await Promise.all(setPromises);
                            
                                // Now, assign the fetched sets to the 'sets' variable
                                const sets: Set[] = fetchedSets.filter(Boolean).map(x => ({
                                    NumberReps: x?.Reps,
                                    Weight: x?.Weight
                                } as unknown as Set));
                            
                                newExerciseWithSets = {
                                    Title: globalExercise.Title,
                                    Description: globalExercise.Description,
                                    Date: globalExercise.Date,
                                    MuscleGroup: globalExercise.MuscleGroup,
                                    Sets: sets.length > 0 ? sets : [],
                                    ExerciseID: trimmedID    
                                } as unknown as ExerciseWithSet;

                            }else if (userExercise) {
                                // implement exercise & set for user plan
                            }
                            
                            if(newExerciseWithSets)
                                newExercises.push(newExerciseWithSets);
                        } catch (error) {
                            // Handle errors if needed
                        }
                    });
    
                    await Promise.all(exercisePromises);
                } catch (error) {
                    // Handle errors if needed
                }
                setExercises(newExercises);
                props.setExercises(newExercises)
            }
        };
    
        fetchData();
    }, [props.existingWorkout]);
    

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
                        <div className="exercise-title-column">
                            <p className="exercise-title">{exercise.Title}</p>
                        </div>
                        <div className="exercise-sets-container">
                            {exercise.Sets.map((set,setIndex) => (
                                <div className="exercise-set-container">
                                    <div className="exercise-column">
                                        <input key={`exercise-${exerciseIndex}-rep-input-${setIndex}`} type="number" className="exercise-number-input" placeholder={"12"} value={set.NumberReps} onChange={(e:any) => {handleSetReps(setIndex, exerciseIndex, parseInt(e.target.value))}}></input>
                                    </div>
                                    <div className="exercise-column">
                                        <input key={`exercise-${exerciseIndex}-weight-input-${setIndex}`} type="number" className="exercise-number-input" placeholder={"100"} value={set.Weight} onChange={(e:any) => {handleSetWeights(setIndex, exerciseIndex, parseInt(e.target.value))}}></input>
                                    </div>
                                    <div className="exercise-column">
                                        <input key={`exercise-${exerciseIndex}-copmleted-input-${setIndex}`} type="checkbox" className="exercise-checkbox-input" onClick={(e: any) => {handleMarkSetCompleted(e.target.checked, setIndex, exerciseIndex)}}></input> 
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="workout-table-add-set">
                        <button className="workout-table-add-set-button" disabled={addCompletedSetLoading} onClick={() => handleaddCompletedSet(exerciseIndex)}>+</button>
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