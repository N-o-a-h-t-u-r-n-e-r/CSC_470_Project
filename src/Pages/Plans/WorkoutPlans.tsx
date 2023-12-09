import React, { useState, useEffect } from 'react';
import UserPlanTable from '../Shared/UserPlanTable'; // Import the UserPlanCard component
import { Workout } from "../../Models/Workout";
import { Exercise } from "../../Models/Exercise";
import ExerciseManager from "../../Managers/ExerciseManager";
import ExerciseSearch from "../Shared/ExerciseSearch";
import SetManager from "../../Managers/SetManager";
import { ExerciseWithSet } from "../../Models/ExerciseWithSet";
import WorkoutInProgress from "../Workout/WorkoutInProgress";
import WorkoutTable from "../Workout/WorkoutTable";
import { Set } from "../../Models/Set";
import { useAuth0 } from "@auth0/auth0-react";
import { doc, addDoc, updateDoc, getDoc, getDocs, deleteDoc, collection, Timestamp, query, where } from "@firebase/firestore"
import { firestore } from "../../firebase_setup/firebase"

interface Props {
  workout?: Workout,
}


interface UserPlan {
  userId: string;
  ExerciseIDs: string;
  planTitle: string;

}

const WorkoutPlans = (props: Props) => {
  const [showUserPlanTable, setShowUserPlanTable] = useState(false);
  const { user } = useAuth0();
  const [userPlan, setUserPlan] = useState<any | null>(null);
  const [planTitle, setPlanTitle] = useState('');
  const [exercises, setExercises] = useState<ExerciseWithSet[]>([]);
  const [completedSets, setCompletedSets] = useState<{ SetIndex: number, ExerciseIndex: number, Reps: number, Weight: number }[]>([]);
  const [isCreateMode, setIsCreateMode] = useState(true);
  const [workoutFromPlan, setWorkoutFromPlan] = useState<Workout>();
  const planCollectionRef = collection(firestore, "User_Plans");


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



  const handleCreatePlan = () => {

    setIsCreateMode(false);
    setShowUserPlanTable(true);
  };



  const handleSave = async () => {
    try {

      const docRef = await addDoc(collection(firestore, 'User_Plans'), {
        userId: user?.sub,
        planTitle: planTitle,
        ExerciseIDs: exercises.map(exercise => exercise.Title).join(', '),
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
    setShowUserPlanTable(false);


  };

  useEffect(() => {

    fetchUserPlan();
  }, [user]);


  return (
    <div className="container">
      <h1 className="user-plans">User Plans</h1>
      <div className="body start-workout-body">
        {showUserPlanTable ? (
          <UserPlanTable
            existingWorkout={workoutFromPlan}
            setExercises={(Exercises: ExerciseWithSet[]) => setExercises(Exercises)}
            setCompletedSets={(CompletedSets: { SetIndex: number; ExerciseIndex: number; Reps: number; Weight: number }[]) =>
              setCompletedSets(CompletedSets)
            }
            setShowExerciseSearch={() => { }}
            planTitle={planTitle}
            setPlanTitle={setPlanTitle}
          />
        ) : (
          <div>
            {userPlan && userPlan.length > 0 && (
              <div className="plan-card-box">
                {userPlan.map((plan: { userId: string; exercises: { title: string; reps: number[] }[], planTitle: string; ExerciseIDs: string; planId: string }, planIndex: number) => (
                  <div key={planIndex} className="plan-card">
                    <h1>{plan.planTitle}</h1>
                    <div>
                      {plan.exercises.map((exercise, index) => (
                        <div key={index} className="exercise-title">
                          <p className="plan-exercise">{exercise.title}:</p>
                          {exercise.reps.length > 0 && (
                            <div className="plan-sets">
                              <p>{exercise.reps.length} x {exercise.reps[0]}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <button className="plan-card-button">Edit</button>
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
          <button className="start-blank-workout-button" onClick={() => { handleSave(); fetchUserPlan(); }}>
            Save
          </button>
        )}
      </div>
    </div>
  );
};
export default WorkoutPlans;