import React, { useState } from "react";
import { firestore } from "../../firebase_setup/firebase";
import { getDocs, collection } from "@firebase/firestore"
import ExerciseManager from "../../Managers/ExerciseManager";
import { setUncaughtExceptionCaptureCallback } from "process";

interface Props {
trigger:boolean;
setTrigger: (value: boolean) => void;
}

const ExerciseSearch = (props: Props) => {

    const [input, setInput] = useState("");
    const [results, setResults] = useState("");

    return(props.trigger) ? (
        <div className="exercise-search-popup-box">
            <div className="exercise-search-box">    
                <button className="exercise-search-button" onClick={() => props.setTrigger(false)}> X </button>
                <div className="input-wrapper">
                    <input placeholder="Type to search..." 
                    value = {input}
                    onChange={(e) => setInput(e.target.value)}
                    />
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
                </div>
            </div>
        </div>
    ): null;

}
export default ExerciseSearch;