import { doc, addDoc, updateDoc, getDoc, getDocs, deleteDoc, collection, Timestamp, query, where } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"
import { useAuth0 } from "@auth0/auth0-react";
import { Workout } from "../Models/Workout";

function WorkoutManager(){
    const { user } = useAuth0();
    const CompletedWorkoutCollectionRef = collection(firestore, "Completed_Workout");

    const addCompletedWorkout = async (Workout: Workout) => {
        try {
            const docRef = await addDoc(CompletedWorkoutCollectionRef, Workout);
            return docRef.id;
        } catch (exception) {
            console.error("Error saving workout: ", exception );
        }
    }

    return { addCompletedWorkout }
}

export default WorkoutManager;