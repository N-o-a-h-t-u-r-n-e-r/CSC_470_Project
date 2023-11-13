import { Exercise } from "../Models/Exercise";

import { getDocs, collection } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"
import { User } from "@auth0/auth0-react";

function ExerciseManager(){
    const GetExercisesFromIDString = (idString: string) => {
        var oReturn: Exercise[] = [];

        const user = User;
        console.log(user);

        const ids = idString.split(',');
        console.log(getExercises())

        return oReturn;
    }

    const getExercises = async () => {
        const ExerciseCollectionRef = collection(firestore, "Exercise") 

        return await getDocs(ExerciseCollectionRef).then((querySnapshot: any)=>{               
            return querySnapshot.docs.map((doc: any) => ({...doc.data()}));
        })
    }

    return {
        GetExercisesFromIDString
    }
}

export default ExerciseManager;
