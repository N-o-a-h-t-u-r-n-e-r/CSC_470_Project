import { Set } from "../Models/Set";

import { addDoc, updateDoc, getDocs, deleteDoc, collection, Timestamp, query, where } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"
import { useAuth0 } from "@auth0/auth0-react";
import { CompletedSet } from "../Models/CompletedSet";

function SetManager(){
    const { user } = useAuth0();
    const SetCollectionRef = collection(firestore, "Set");

    const addSet = async (CompletedSet: CompletedSet) => {
        try {
            const docRef = await addDoc(SetCollectionRef, CompletedSet);
      
            return docRef.id;
        } catch (exception) {
            console.error("Error saving exercise: ", exception );
        }
    }

    const updateSet = async (setID: number) => {
        //updateDoc
    }

    const getSets = async () => {
        // try {
        //     const searchQuery = query(ExerciseCollectionRef, where("UserID", "==", user?.sub));
        //     const queryResults = await getDocs(searchQuery);
            
        //     return queryResults.docs.map((doc: any) => {
        //         const exerciseData: Exercise = doc.data() as Exercise;
        //         return exerciseData;
        //     });
        // } catch (exception) {
        //     console.error("Error getting exercises: ", exception );
        // }
    } 

    const deleteSet = async (exerciseID: number) => {
        //deleteDoc
    }

    return { addSet }
}

export default SetManager;
