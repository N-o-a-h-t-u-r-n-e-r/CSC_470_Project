import { Exercise } from "../Models/Exercise";

import { addDoc, updateDoc, getDocs, deleteDoc, collection, Timestamp, query, where } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"
import { useAuth0 } from "@auth0/auth0-react";

function ExerciseManager(){
    const { user } = useAuth0();
    const ExerciseCollectionRef = collection(firestore, "Exercise");

    const addExercise = async (title: string, muscleGroup: string, description: string) => {
        try {
            const exercise = {
                UserID: user?.sub,
                Title: title,
                Description: description,
                MuscleGroup: muscleGroup,
                Date: Timestamp.fromDate(new Date()),
            } as unknown as Exercise;

            const docRef = await addDoc(ExerciseCollectionRef, exercise);

            const returnExercise = {
                id: docRef.id,
                UserID: exercise.UserID,
                Title: exercise.Title,
                Description: exercise.Description,
                MuscleGroup: exercise.MuscleGroup,
                Date: exercise.Date,
            } as unknown as Exercise;
            
            return returnExercise;
        } catch (exception) {
            console.error("Error saving exercise: ", exception );
        }
    }

    const updateExercise = async (exerciseID: number) => {
        //updateDoc
    }

    const getExercises = async () => {
        try {
            const searchQuery = query(ExerciseCollectionRef, where("UserID", "==", user?.sub));
            const queryResults = await getDocs(searchQuery);
            
            return queryResults.docs.map((doc: any) => {
                const exerciseData: Exercise = doc.data() as Exercise;
                return exerciseData;
            });
        } catch (exception) {
            console.error("Error getting exercises: ", exception );
        }
    } 
    
    const getGlobalExercises = async () => {
        try {
            const searchQuery = query(ExerciseCollectionRef, where("UserID", "==", "GLOBAL"));
            const queryResults = await getDocs(searchQuery);
            
            return queryResults.docs.map((doc: any) => {
                const exerciseData: Exercise = doc.data() as Exercise;
                return exerciseData;
            });
        } catch (exception) {
            console.error("Error getting exercises: ", exception );
        }
    }    

    const deleteExercise = async (exerciseID: number) => {
        //deleteDoc
    }

    return { addExercise, getExercises }
}

export default ExerciseManager;
