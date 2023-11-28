import { Set } from "../Models/Set";

import { addDoc, updateDoc, getDoc, doc, deleteDoc, collection, Timestamp, query, where } from "@firebase/firestore"
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

    const getSets = async (id: string) => {
        const docRef = doc(SetCollectionRef, id);
        try {
            const doc = await getDoc(docRef);
            return doc.data() as Set;
        } catch (exception) {
            console.error("Error getting sets: ", exception)
        }
    } 

    const deleteSet = async (exerciseID: number) => {
        //deleteDoc
    }

    return { addSet, getSets }
}

export default SetManager;
