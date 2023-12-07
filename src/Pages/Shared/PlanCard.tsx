import React, { useEffect, useState } from "react";
import { Exercise } from "../../Models/Exercise";
import { Plan } from "../../Models/Plan";
import { doc, addDoc, updateDoc, getDoc, getDocs, deleteDoc, collection, Timestamp, query, where } from "@firebase/firestore"
import { firestore } from "../../firebase_setup/firebase"
import { useAuth0 } from "@auth0/auth0-react";

interface Props {
    setShowExerciseAdd?: (showExerciseAdd: boolean) => void,
    returnPlan: (plan: Plan) => void
}


const getExercisebyID = async (id: string) => {
    try {
      const exerciseDoc = doc(firestore, 'Exercise', id);
      const exerciseSnapshot = await getDoc(exerciseDoc);
  
      if (exerciseSnapshot.exists()) {
        return { id: exerciseSnapshot.id, ...exerciseSnapshot.data() as Exercise};
      } else {
        console.log(`Exercise not found for ID: ${id}`);
        return null;
      }
    } catch (error) {
      console.error('Error getting exercise:', error);
      return null;
    }
  };

const PlanCard = (props: Props) => {

    const [exerciseList, setExerciseList] = useState<Exercise[]>([]);

    const [planList, setPlanList] = useState<Plan[]>([]);
    const planCollectionRef = collection(firestore, "Global_Preset_Workouts");

    useEffect(() => {
        const getPlansList = async () => {
          try {
            const data = await getDocs(planCollectionRef);
            const plans = data.docs.map((doc) => ({
              ...(doc.data() as Plan),
              id: doc.id,
            }));
    
            setPlanList(plans);
    
            const exerciseIdsArray = plans.flatMap((plan) =>
              plan.ExerciseIDs ? plan.ExerciseIDs.split(',') : []
            );
            const uniqueExerciseIds = Array.from(new Set(exerciseIdsArray));
    

            const exercises = await Promise.all(
              uniqueExerciseIds.map(async (exerciseId) => await getExercisebyID(exerciseId.trim()))
            );
    
            const filteredExercises = exercises.filter((exercise) => exercise !== null) as Exercise[];
    
            setExerciseList(filteredExercises);
          } catch (err) {
            console.error('Error fetching data:', err);
          }
        };
    
        getPlansList();
      }, []);
    
      return (
        <div className="plan-card-box">
          {planList.map((plan, index) => (
            <div className="plan-card" key={plan.id}>
              <h1>{plan.Title}</h1>
              <div className="exercise-details">
                {plan.ExerciseIDs &&
                  plan.ExerciseIDs.split(',').map((exerciseId, index) => {
                    const exercise = exerciseList.find((ex) => ex.id === exerciseId.trim());
                    return (
                      exercise && (
                        <div key={index} className="exercise-title">

                          <p className="plan-exercise">{`${exercise.Title}: `}</p>
                          <p className="plan-sets">{`${exercise.SetID[0]}`}</p>
                         
                        </div>
                      )
                    );
                  })}
              </div>
              <button className="plan-card-button">Start</button>
            </div>
          ))}
        </div>
      );
    };
    
    export default PlanCard;