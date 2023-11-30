import { Set } from "../Models/Set";

import { addDoc, updateDoc, getDoc, doc, deleteDoc, collection, Timestamp, query, where } from "@firebase/firestore"
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
