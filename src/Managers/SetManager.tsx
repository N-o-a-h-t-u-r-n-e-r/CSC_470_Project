import { Set } from "../Models/Set";

import { addDoc, updateDoc, getDoc, getDocs, doc, deleteDoc, collection, Timestamp, query, where } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"
import { useAuth0 } from "@auth0/auth0-react";
import { CompletedSet } from "../Models/CompletedSet";

function SetManager(){
    const { user } = useAuth0();
    const CompletedSetCollectionRef = collection(firestore, "Set");
    const GlobalSetCollectionRef = collection(firestore, "Global_Set")

    const addCompletedSet = async (CompletedSet: CompletedSet) => {
        try {
            const docRef = await addDoc(CompletedSetCollectionRef, CompletedSet);
      
            return docRef.id;
        } catch (exception) {
            console.error("Error saving exercise: ", exception );
        }
    }

    const updateSet = async (setID: number) => {
        //updateDoc
    }

    const getCompletedSets = async (forExerciseID: string) => {
        try {
            // Query the Set collection where ForExerciseID matches the provided ID
            const q = query(CompletedSetCollectionRef, where("ForExerciseID", "==", forExerciseID));
            
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

    const getGlobalSetbyID = async (id: string) => {
        const docRef = doc(GlobalSetCollectionRef, id);
        try {
            const doc = await getDoc(docRef);
            return doc.data() as Set;
        } catch (exception) {
            console.error("Error getting set: ", exception );
        }
    }

    const deleteSet = async (exerciseID: number) => {
        //deleteDoc
    }

    return { addCompletedSet, getCompletedSets, getGlobalSetbyID }
}

export default SetManager;
