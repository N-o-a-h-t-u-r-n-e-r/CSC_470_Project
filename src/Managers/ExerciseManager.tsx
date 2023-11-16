import { Exercise } from "../Models/Exercise";

import { addDoc, updateDoc, getDocs, deleteDoc, collection } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"

function ExerciseManager(){
    const ExerciseCollectionRef = collection(firestore, "Exercise");

    const saveExercise = async (exercise: Exercise) => {
        try {
            return await addDoc(ExerciseCollectionRef, exercise);
        } catch (exception) {
            console.error("Error saving exercise: ", exception );
        }
    }

    const updateExercise = async (exerciseID: number) => {
        //updateDoc
    }

    const getExercises = async () => {
        try {
            return await getDocs(ExerciseCollectionRef).then((querySnapshot: any)=>{               
                return querySnapshot.docs.map((doc: any) => ({...doc.data()}));
            })
        } catch (exception) {
            console.error("Error getting exercises: ", exception );
        }
    }

    const deleteExercise = async (exerciseID: number) => {
        //deleteDoc
    }

    return {
        
    }
}

export default ExerciseManager;
