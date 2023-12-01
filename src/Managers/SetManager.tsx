import { Set } from "../Models/Set";

import { addDoc, updateDoc, getDocs, doc, deleteDoc, collection, Timestamp, query, where } from "@firebase/firestore"
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

    const getSets = async (forExerciseID: string) => {
        try {
            // Query the Set collection where ForExerciseID matches the provided ID
            const q = query(SetCollectionRef, where("ForExerciseID", "==", forExerciseID));
            
            // Get the documents that match the query
            const querySnapshot = await getDocs(q);
            
            // Create an array to store the sets
            const sets: Set[] = [];
    
            // Iterate through the documents and extract the Set objects
            querySnapshot.forEach((doc) => {
                const completedSet = doc.data() as CompletedSet;
                sets.push(completedSet.Set);
            });
    
            return sets;
        } catch (exception) {
            console.error("Error getting sets: ", exception);
            return [];
        }
    }

    const deleteSet = async (exerciseID: number) => {
        //deleteDoc
    }

    return { addSet, getSets }
}

export default SetManager;
