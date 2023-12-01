import { useState } from "react";

import WorkoutInProgress from "./WorkoutInProgress";
import PlanCard from "../Shared/PlanCard";

interface Props {

}

const StartWorkout = (props: Props) => {
    const [displayWorkoutInProgress, setDisplayWorkoutInProgress] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(undefined);
    const [showPlanCard, setShowPlanCard] = useState(undefined);

    return(
        <>
            {displayWorkoutInProgress ?
                <WorkoutInProgress workout={selectedWorkout}/>
            :
                <div className="container">
                    <div className="header start-workout-header">
                        <h1>Start Workout</h1>
                    </div>
                    <div className="body start-workout-body">
                        <PlanCard></PlanCard>
                    </div>
                    <div className="footer start-blank-workout-button-container">
                        <button className="start-blank-workout-button" onClick={() => setDisplayWorkoutInProgress(!displayWorkoutInProgress)}>Start Blank Workout</button>
                    </div>
                </div>
            }
        </>
    );

}

export default StartWorkout;