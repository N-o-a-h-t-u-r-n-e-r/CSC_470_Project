import { Exercise } from "../Models/Exercise";

import { doc, addDoc, updateDoc, getDoc, getDocs, deleteDoc, collection, Timestamp, query, where } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"
import { useAuth0 } from "@auth0/auth0-react";

function ExerciseManager(){
    const { user } = useAuth0();
    const UserExerciseCollectionRef = collection(firestore, "User_Exercises");
    const GlobalExerciseCollectionRef = collection(firestore, "Exercise");
    const CompletedExerciseCollectionRef = collection(firestore, "Completed_Exercises");

    const addCompletedExercise = async (Exercise: Exercise) => {
        try {
            const docRef = await addDoc(CompletedExerciseCollectionRef, Exercise);
            return docRef.id;
        } catch (exception) {
            console.error("Error saving exercise: ", exception );
        }
    }

    const addExercise = async (title: string, muscleGroup: string, description: string) => {
        try {
            const exercise = {
                UserID: user?.sub,
                Title: title,
                Description: description,
                MuscleGroup: muscleGroup,
                Date: Timestamp.fromDate(new Date()),
                SetIDs: "",
            } as unknown as Exercise;

            const docRef = await addDoc(UserExerciseCollectionRef, exercise);

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

    const getUserExercises = async () => {
        try {
            const searchQuery = query(UserExerciseCollectionRef, where("UserID", "==", user?.sub));
            const queryResults = await getDocs(searchQuery);
            
            return queryResults.docs.map((doc: any) => {
                const exerciseData: Exercise = doc.data() as Exercise;
                return exerciseData;
            });
        } catch (exception) {
            console.error("Error getting exercises: ", exception );
        }
    }

    const getExercisebyID = async (id: string) => {
        const docRef = doc(UserExerciseCollectionRef, id);
        try {
            const doc = await getDoc(docRef);
            return doc.data() as Exercise;
        } catch (exception) {
            console.error("Error getting exercises: ", exception );
        }
    }
    
    const getGlobalExercises = async () => {
        try {
            const searchQuery = query(GlobalExerciseCollectionRef, where("UserID", "==", "global"));
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

    return { addExercise, addCompletedExercise, getUserExercises, getGlobalExercises }
}

export default ExerciseManager;
