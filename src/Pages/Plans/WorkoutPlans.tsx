import React, { useState, useEffect } from 'react';
import UserPlanCard from '../Shared/UserPlanCard'; // Import the UserPlanCard component
import { Workout } from "../../Models/Workout";
import { Exercise } from "../../Models/Exercise";
import ExerciseManager from "../../Managers/ExerciseManager";
import ExerciseSearch from "../Shared/ExerciseSearch";
import SetManager from "../../Managers/SetManager";
import { ExerciseWithSet } from "../../Models/ExerciseWithSet";
import { Set } from "../../Models/Set";
import { useAuth0 } from "@auth0/auth0-react";
import { doc, addDoc, updateDoc, getDoc, getDocs, deleteDoc, collection, Timestamp, query, where } from "@firebase/firestore"
import { firestore } from "../../firebase_setup/firebase"

interface Props {
  workout?: Workout,
}


interface UserPlan {
  userId: string;
  exerciseTitles: string;

}

const WorkoutPlans = (props: Props) => {
  const [showUserPlanCard, setShowUserPlanCard] = useState(false);
  const { user } = useAuth0();
  const [userPlan, setUserPlan] = useState<any | null>(null);


  const [workout, setWorkout] = useState(props.workout);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [showWorkoutCompletedReport, setShowWorkoutCompletedReport] = useState(false);
  const [showExerciseSearch, setShowExerciseSearch] = useState(false);
  const [exercises, setExercises] = useState<ExerciseWithSet[]>([]);
  const [completedSets, setCompletedSets] = useState<{ SetIndex: number, ExerciseIndex: number, Reps: number, Weight: number }[]>([]);
  const [isCreateMode, setIsCreateMode] = useState(true);

  const planCollectionRef = collection(firestore, "User_Plans");

  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        const planQuery = query(planCollectionRef, where('userId', '==', user?.sub));
        const planSnapshot = await getDocs(planQuery);

        if (!planSnapshot.empty) {
          const userPlansData = planSnapshot.docs.map(doc => doc.data() as UserPlan);
          setUserPlan(userPlansData);
        }
      } catch (error) {
        console.error('Error fetching user plans:', error);
      }
    };

    fetchUserPlan();
  }, [user]);


  const handleCreatePlan = () => {

    setIsCreateMode(false);
    setShowUserPlanCard(true);
  };


  const handleSave = async () => {
    try {

      const docRef = await addDoc(collection(firestore, 'User_Plans'), {
        userId: user?.sub,
        exerciseTitles: exercises.map(exercise => exercise.Title).join(', '),
        exercises: exercises.map(exercise => ({
          title: exercise.Title,
          reps: exercise.Sets.map(set => set.NumberReps),
          sets: exercise.Sets,
        })),
      });

      console.log('Workout saved with ID:', docRef.id);


    } catch (error) {
      console.error('Error saving workout:', error);


      alert('Error saving workout. Please try again.');
    }

    setIsCreateMode(true);
    setShowUserPlanCard(false);
  };



  return (
    <div className="container">
      <div className="header start-workout-header">
        <h1>Workout Plans</h1>
      </div>
      <div className="body start-workout-body">
        {showUserPlanCard ? (
          <UserPlanCard existingWorkout={workout} setExercises={(Exercises: ExerciseWithSet[]) => setExercises(Exercises)}
            setCompletedSets={(CompletedSets: { SetIndex: number, ExerciseIndex: number, Reps: number, Weight: number }[]) => setCompletedSets(CompletedSets)}
            setShowExerciseSearch={setShowExerciseSearch} />
        ) : (
          <div>
            {userPlan && userPlan.length > 0 && (
              <div>
                <p>Main</p>
                {userPlan.map((plan: { userId: string; exercises: { title: string; reps: number[] }[] }, planIndex: number) => (
                  <div key={planIndex}>
                    <p>Exercise Titles:</p>
                    <ul>
                      {plan.exercises.map((exercise, index) => (
                        <li key={index}>{exercise.title}</li>
                      ))}
                    </ul>

                    <div>
                      <p>Sets:</p>
                      <ul>
                        {plan.exercises.map((exercise, exerciseIndex) => (
                          <li key={exerciseIndex}>
                            {exercise.reps.length > 0 && (
                              <span>
                                First Rep: {exercise.reps[0]}, Sets: {exercise.reps.length}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="footer start-blank-workout-button-container">
        {isCreateMode ? (
          <button className="start-blank-workout-button" onClick={handleCreatePlan}>
            Create New Plan
          </button>
        ) : (
          <button className="start-blank-workout-button" onClick={handleSave}>
            Save
          </button>
        )}
      </div>
    </div>
  );
};
export default WorkoutPlans;