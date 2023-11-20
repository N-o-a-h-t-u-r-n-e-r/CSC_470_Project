import { Set } from "../Models/Set";

import { addDoc, updateDoc, getDocs, deleteDoc, collection, Timestamp, query, where } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"
import { useAuth0 } from "@auth0/auth0-react";

function SetManager(){
    const { user } = useAuth0();
    const SetCollectionRef = collection(firestore, "Set");

    const addSet = async (NumberReps?: number, Weight?: number) => {
        try {
            const set = {
                NumberReps: NumberReps === undefined ? 12 : NumberReps,
                Weight: Weight === undefined ? 100 : Weight,
            } as unknown as Set;

            const docRef = await addDoc(SetCollectionRef, set);

            set.SetID = docRef.id;
            
            return set;
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
