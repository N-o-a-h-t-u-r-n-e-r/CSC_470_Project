import { useState } from "react";

import WorkoutInProgress from "./WorkoutInProgress";
import PlanCard from "../Shared/PlanCard";
import { Plan } from "../../Models/Plan";
import { Workout } from "../../Models/Workout";
import  WorkoutPlans  from "../Plans/WorkoutPlans";

interface Props {

}

const StartWorkout = (props: Props) => {
    const [displayWorkoutInProgress, setDisplayWorkoutInProgress] = useState(false);
    const [workoutFromPlan, setWorkoutFromPlan] = useState<Workout>();
    const [workoutFromUserPlan, setWorkoutFromUserPlan] = useState();
    const [forGlobalPlan, setForGlobalPlan] = useState(false);

    const handleStartWithGlobalPlan = (plan: Plan) => {
        console.log(plan);

        const newWorkout = {
            Title: plan.Title,
            ExerciseIDs: plan.ExerciseIDs,
        } as unknown as Workout;

        setWorkoutFromPlan(newWorkout);
        setForGlobalPlan(true);

        setDisplayWorkoutInProgress(true);
    }

    const handleStartWithUserPlan = (plan: any) => {
        console.log(plan);

        setWorkoutFromUserPlan(plan);

        setDisplayWorkoutInProgress(true);
    }

    return(
        <>
            {displayWorkoutInProgress ?
                <WorkoutInProgress workout={workoutFromPlan} workoutFromUserPlan={workoutFromUserPlan} forGlobalPlan={forGlobalPlan} />
            :
                <div className="container">
                    <div className="header start-workout-header">
                        <h1>Preset Plans</h1>
                    </div>
                    <div className="body start-workout-body">
                        <PlanCard returnGlobalPlan={(plan: Plan) => handleStartWithGlobalPlan(plan)} returnUserPlan={(plan: Plan) => handleStartWithUserPlan(plan)}></PlanCard>

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