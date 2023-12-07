import UserPlanCard from "../Shared/UserPlanCard";

interface Props {

}

const WorkoutPlans = (props: Props) => {

    return(
        <div className="container">
            <div className="workout-plans-header">
                <h1>Workout Plans</h1>
            </div>
            <div className="workout-plans-body">
            <UserPlanCard></UserPlanCard>
            </div>
        </div>
    );

}

export default WorkoutPlans;