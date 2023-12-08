import React, { useState } from 'react';
import UserPlanCard from '../Shared/UserPlanCard'; // Import the UserPlanCard component
import { Workout } from "../../Models/Workout";
import { Exercise } from "../../Models/Exercise";
import ExerciseManager from "../../Managers/ExerciseManager";
import ExerciseSearch from "../Shared/ExerciseSearch";
import SetManager from "../../Managers/SetManager";
import { ExerciseWithSet } from "../../Models/ExerciseWithSet";
import { Set } from "../../Models/Set";

interface Props {
    workout?: Workout,
  }



const WorkoutPlans = (props: Props) => {
  const [showUserPlanCard, setShowUserPlanCard] = useState(false);

  const handleCreatePlan = () => {
    // Set showUserPlanCard to true to display the UserPlanCard component
    setShowUserPlanCard(true);
  };

  const [workout, setWorkout] = useState(props.workout);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
    const [showWorkoutCompletedReport, setShowWorkoutCompletedReport] = useState(false);
    const [showExerciseSearch, setShowExerciseSearch] = useState(false);
    const [ exercises, setExercises ] = useState<ExerciseWithSet[]>([]);
    const [ completedSets, setCompletedSets ] = useState<{SetIndex: number, ExerciseIndex: number, Reps: number, Weight: number}[]>([]);

  return (
    <div className="container">
      <div className="header start-workout-header">
        <h1>Workout Plans</h1>
      </div>
      <div className="body start-workout-body">
        {showUserPlanCard ? (
          <UserPlanCard existingWorkout={workout} setExercises={(Exercises: ExerciseWithSet[]) => setExercises(Exercises)} setCompletedSets={(CompletedSets: {SetIndex: number, ExerciseIndex: number, Reps: number, Weight: number}[]) => setCompletedSets(CompletedSets)} setShowExerciseSearch={setShowExerciseSearch} />
        ) : (
          <div>
            {/* Add other content or components here */}
            <p>Other content goes here.</p>
          </div>
        )}
      </div>

      <div className="footer start-blank-workout-button-container">
        <button className="start-blank-workout-button" onClick={handleCreatePlan}>
          Create New Plan
        </button>
      </div>
    </div>
  );
};

export default WorkoutPlans;