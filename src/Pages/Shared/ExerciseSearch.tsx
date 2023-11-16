import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase_setup/firebase";
import { getDocs, collection } from "@firebase/firestore"
import ExerciseManager from "../../Managers/ExerciseManager";
import { setUncaughtExceptionCaptureCallback } from "process";

interface Props {
    setShowExerciseSearch: (showExerciseSearch: boolean) => void;
}

const ExerciseSearch = (props: Props) => {

    const [searchString, setSearchString] = useState("");
    const [results, setResults] = useState("");

    return(
        <div className="exercise-search-popup-box">
            <div className="exercise-search-box">    
                <button className="exercise-search-button" onClick={() => props.setShowExerciseSearch(false)}> X </button>
                <div className="input-wrapper">
                    <input placeholder="Type to search..." value={searchString} onChange={(e) => setSearchString(e.target.value)} />
                    <div className="results-list">
                        <div>Squat</div>
                        <div>Deadlift</div>
                        <div>Bench</div>
                        <div>Bicep Curl</div>
                        <div>Tricep Extension</div>
                        <div>Pull Ups</div>
                        <div>Chin Ups</div>
                        <div>Skull Crushers</div>
                        <div>Lat Pull Down</div>
                    </div>
                    <div className="add-exercise-search-button-container">
                        <button className="add-exercise-search-button">Add Exercise</button>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default ExerciseSearch;