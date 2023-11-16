import { Exercise } from "../Models/Exercise";

import { getDocs, collection } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"

function ExerciseManager(){

    const getExercises = async () => {
        const ExerciseCollectionRef = collection(firestore, "Exercise") 

        return await getDocs(ExerciseCollectionRef).then((querySnapshot: any)=>{               
            return querySnapshot.docs.map((doc: any) => ({...doc.data()}));
        })
    }

    return {
        getExercises
    }
}

export default ExerciseManager;
