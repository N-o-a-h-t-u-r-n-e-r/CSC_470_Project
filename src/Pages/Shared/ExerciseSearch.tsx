import React, { useEffect, useState } from "react";

import ExerciseManager from "../../Managers/ExerciseManager";

import ExerciseAdd from "./ExerciseAdd";
import { Exercise } from "../../Models/Exercise";

interface Props {
    setShowExerciseSearch: (showExerciseSearch: boolean) => void;
}

const ExerciseSearch = (props: Props) => {

    const [searchString, setSearchString] = useState("");
    const [loading, setLoading] = useState(true);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [showExerciseAdd, setShowExerciseAdd] = useState(false);

    const exerciseManager = ExerciseManager();

    const handleExerciseAddReturn = () => {
        getExercises();
        setShowExerciseAdd(false);
    }

    const getExercises = () => {
        setLoading(true);
        exerciseManager.getExercises().then((result) => {
            if(result){
                console.log(result);
                setExercises(result);
            }
        });
        setLoading(false);
    }

    useEffect(() => {
        getExercises();
    }, [])
    
    return(
        <>  
            { showExerciseAdd ?
                <ExerciseAdd setShowExerciseAdd={(showExerciseSearch: boolean) => setShowExerciseAdd(showExerciseSearch)} returnExercise={handleExerciseAddReturn}/>
            :
                <div className='popup-box exercise-search-box'>    
                    <button className="exercise-search-button" onClick={() => props.setShowExerciseSearch(false)}>x</button>
                    <div>
                        <input className="search-input" placeholder="Type to search..." value={searchString} onChange={(e) => setSearchString(e.target.value)} />
                            <div className="results-list">
                            {exercises.length > 0 ?
                                <div>
                                    {exercises.filter(x => x.Title.includes(searchString)).map((item, index) => (
                                        <div key={`result-option-${index}`} className="result-option">{item.Title}</div>
                                    ))}
                                </div>
                            :
                                <>
                                    {loading ?
                                        <div>
                                            <svg className="spinner" viewBox="0 0 50 50">
                                                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                                            </svg>
                                        </div>
                                    :
                                        <div>
                                            No Exercises, add an exercise to get started
                                        </div>
                                    }
                                </>
                            }
                            </div>
                        <div className="add-exercise-exercise-search-button-container">
                            <button className="add-exercise-exercise-search-button" onClick={() => setShowExerciseAdd(true)}>Add New Exercise</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );

}
export default ExerciseSearch;