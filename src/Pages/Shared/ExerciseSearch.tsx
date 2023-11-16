import React, { useEffect, useState } from "react";
import ExerciseManager from "../../Managers/ExerciseManager";

interface Props {
    setShowExerciseSearch: (showExerciseSearch: boolean) => void;
}

const ExerciseSearch = (props: Props) => {

    const [searchString, setSearchString] = useState("");
    const [loading, setLoading] = useState(true);
    const [exercises, setExercises] = useState([]);

    const exerciseManager = ExerciseManager();

    return(        
        <div className="exercise-search-box">    
            <button className="exercise-search-button" onClick={() => props.setShowExerciseSearch(false)}>x</button>
            <div>
                <input className="search-input" placeholder="Type to search..." value={searchString} onChange={(e) => setSearchString(e.target.value)} />
                    <div className="results-list">
                    {loading ?
                        <div>
                            <svg className="spinner" viewBox="0 0 50 50">
                                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                            </svg>
                        </div>
                    :
                        <div>
                            <div className="result-option">Squat</div>
                            <div className="result-option">Deadlift</div>
                            <div className="result-option">Bench</div>
                            <div className="result-option">Bicep Curl</div>
                            <div className="result-option">Tricep Extension</div>
                            <div className="result-option">Pull Ups</div>
                            <div className="result-option">Chin Ups</div>
                            <div className="result-option">Skull Crushers</div>
                            <div className="result-option">Lat Pull Down</div>
                            <div className="result-option">Squat</div>
                            <div className="result-option">Deadlift</div>
                            <div className="result-option">Bench</div>
                            <div className="result-option">Bicep Curl</div>
                            <div className="result-option">Tricep Extension</div>
                            <div className="result-option">Pull Ups</div>
                            <div className="result-option">Chin Ups</div>
                            <div className="result-option">Skull Crushers</div>
                            <div className="result-option">Lat Pull Down</div>
                        </div>
                    }
                    </div>
                <div className="add-exercise-exercise-search-button-container">
                    <button className="add-exercise-exercise-search-button">Add Exercise</button>
                </div>
            </div>
        </div>
    );

}
export default ExerciseSearch;