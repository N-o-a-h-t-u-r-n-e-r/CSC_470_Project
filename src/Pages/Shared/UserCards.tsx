import React, { useState, useEffect } from 'react';
import UserPlanCard from './UserPlanTable'; // Import the UserPlanCard component
import { Workout } from "../../Models/Workout";
import { Exercise } from "../../Models/Exercise";
import ExerciseManager from "../../Managers/ExerciseManager";
import ExerciseSearch from "./ExerciseSearch";
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
  ExerciseIDs: string;
  planTitle: string;

}

const UserCards = (props: Props) => {
  const [showUserPlanCard, setShowUserPlanCard] = useState(false);
  const { user } = useAuth0();
  const [userPlan, setUserPlan] = useState<any | null>(null);
  const [planTitle, setPlanTitle] = useState('');
  const [workout, setWorkout] = useState(props.workout);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [showWorkoutCompletedReport, setShowWorkoutCompletedReport] = useState(false);
  const [showExerciseSearch, setShowExerciseSearch] = useState(false);
  const [exercises, setExercises] = useState<ExerciseWithSet[]>([]);
  const [completedSets, setCompletedSets] = useState<{ SetIndex: number, ExerciseIndex: number, Reps: number, Weight: number }[]>([]);
  const [isCreateMode, setIsCreateMode] = useState(true);

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
    setShowUserPlanCard(true);
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
    setShowUserPlanCard(false);

    
  };

  useEffect(() => {
    // Fetch user plans when the component mounts or when user changes
    fetchUserPlan();
  }, [user]);


  const handleEditPlan = async (plan: UserPlan) => {
  
        
       
        setIsCreateMode(false);
        setShowUserPlanCard(true);
      
  };

  return (
    <div>
     
      
      
        {showUserPlanCard ? (
          <UserPlanCard
            existingWorkout={workout}
            setExercises={(Exercises: ExerciseWithSet[]) => setExercises(Exercises)}
            setCompletedSets={(CompletedSets: { SetIndex: number; ExerciseIndex: number; Reps: number; Weight: number }[]) =>
              setCompletedSets(CompletedSets)
            }
            setShowExerciseSearch={() => {}}
            planTitle={planTitle} // Pass planTitle down to UserPlanCard
            setPlanTitle={setPlanTitle} // Pass setPlanTitle down to UserPlanCard

          />
        ) : (

          <div>

            {userPlan && userPlan.length > 0 && (
              <div>

                {userPlan.map((plan: { userId: string; exercises: { title: string; reps: number[] }[], planTitle: string }, planIndex: number) => (
                  <div key={planIndex} className="plan-card">
                    <h2>{plan.planTitle}</h2>
                    <div>
                      {plan.exercises.map((exercise, index) => (
                        <p key={index} className="plan-exercise-title">{exercise.title}</p>
                      ))}
                    </div>

                    <div className="sets-reps-box">

                      {plan.exercises.map((exercise, exerciseIndex) => (
                        <div key={exerciseIndex}>
                          {exercise.reps.length > 0 && (
                            <div>
                              <p className="sets-reps">{exercise.reps.length} x {exercise.reps[0]}</p>
                            </div>
                          )}
                        </div>
                      ))}

                    </div>
                    <button onClick={() => handleEditPlan}>Edit</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
     

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
export default UserCards;