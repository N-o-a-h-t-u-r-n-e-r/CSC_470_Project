import React, { useState } from "react";

interface Props {
trigger:boolean;
setTrigger: (value: boolean) => void;
}

const ExerciseSearch = (props: Props) => {

    return(props.trigger) ? (
        <div className="exercise-search-popup-box">
            <div className="exercise-search-box">    
                <button className="exercise-search-button" onClick={() => props.setTrigger(false)}> X </button>
            </div>
        </div>
    ): null;

}

export default ExerciseSearch;