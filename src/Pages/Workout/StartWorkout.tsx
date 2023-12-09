import { useState } from "react";

import WorkoutInProgress from "./WorkoutInProgress";
import PlanCard from "../Shared/PlanCard";
import { Plan } from "../../Models/Plan";
import { Workout } from "../../Models/Workout";

interface Props {

}

const StartWorkout = (props: Props) => {
    const [displayWorkoutInProgress, setDisplayWorkoutInProgress] = useState(false);
    const [workoutFromPlan, setWorkoutFromPlan] = useState<Workout>();

    const handleStartWithPlan = (plan: Plan) => {
        console.log(plan);

        const newWorkout = {
            Title: plan.Title,
            ExerciseIDs: plan.ExerciseIDs,
        } as unknown as Workout;

        setWorkoutFromPlan(newWorkout);

        setDisplayWorkoutInProgress(true);
    }

    return(
        <>
            {displayWorkoutInProgress ?
                <WorkoutInProgress workout={workoutFromPlan} />
            :
                <div className="container">
                    <div className="header start-workout-header">
                        <h1>Preset Workouts</h1>
                    </div>
                    <div className="body start-workout-body">
                        <PlanCard returnPlan={(plan: Plan) => handleStartWithPlan(plan)}></PlanCard>
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