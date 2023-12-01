import { doc, addDoc, updateDoc, getDoc, getDocs, deleteDoc, collection, Timestamp, query, where } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"
import { useAuth0 } from "@auth0/auth0-react";
import { UserExerciseRecord } from "../Models/UserExerciseRecord";

function UserExerciseRecordManager() {
    const { user } = useAuth0();
    const UserExerciseRecordCollectionRef = collection(firestore, "User_Exercise_Record_ID");

    const getUserExerciseRecord = async (exerciseID: string) => {
        try {
            const searchQuery = query(UserExerciseRecordCollectionRef, where("UserID", "==", user?.sub), where("ExerciseID", "==", exerciseID));
            const queryResults = await getDocs(searchQuery);
    
            if (queryResults.empty) {
                return null;
            }
    
            const firstDoc = queryResults.docs[0];
            const userExerciseRecordData: UserExerciseRecord = firstDoc.data() as UserExerciseRecord;
            return userExerciseRecordData;
        } catch (exception) {
            console.error("Error getting Records: ", exception);
        }
    }

    const addUserExerciseRecord = async (exerciseID: string, reps: number, weight: number) => {
        try {
            const UserExerciseRecord = {
                UserID: user?.sub,
                ExerciseID: exerciseID,
                MaxVolumeReps: reps,
                MaxVolumeWeight: weight,
                MaxVolumeDate: Timestamp.fromDate(new Date()),
                MaxWeight: weight,
                MaxWeightReps: reps,
                MaxWeightDate: Timestamp.fromDate(new Date())
            } as unknown as UserExerciseRecord;

            const docRef = await addDoc(UserExerciseRecordCollectionRef, UserExerciseRecord);

            return

        } catch (exception) {
            console.error("Error saving exercise: ", exception);
        }
    }

    const updateUserExerciseRecord = async (exerciseID: string, reps: number, weight: number, category: string) => {
        const searchQuery = query(
            UserExerciseRecordCollectionRef,
            where("UserID", "==", user?.sub),
            where("ExerciseID", "==", exerciseID)
        );

        const queryResults = await getDocs(searchQuery);
        if (queryResults.empty) {
            console.error("User exercise record not found:")
            return
        }

        const userExerciseRecordRef = queryResults.docs[0].ref;

        if (category === "Both") {
            await updateDoc(userExerciseRecordRef, {
                MaxVolumeReps: reps,
                MaxVolumeWeight: weight,
                MaxVolumeDate: Timestamp.fromDate(new Date()),
                MaxWeight: weight,
                MaxWeightReps: reps,
                MaxWeightDate: Timestamp.fromDate(new Date())
            });
        } else if (category == "Reps") {
            await updateDoc(userExerciseRecordRef, {
                MaxVolumeReps: reps,
                MaxVolumeWeight: weight,
                MaxVolumeDate: Timestamp.fromDate(new Date()),
            });

        } else if (category == "Weight") {
            await updateDoc(userExerciseRecordRef, {
                MaxWeight: weight,
                MaxWeightReps: reps,
                MaxWeightDate: Timestamp.fromDate(new Date())
            });

        } else {
            console.error("Something went wrong with the updating");
        }


    }


    const PRanator = async (exerciseID: string, rep: number, weight: number) => {

        const pulledRecord = await getUserExerciseRecord(exerciseID) as unknown as UserExerciseRecord;

        if (!pulledRecord) {
            await addUserExerciseRecord(exerciseID, rep, weight);
            return "New";
        } 

        const recordWeight = pulledRecord.MaxWeight;
        const recordReps = pulledRecord.MaxVolumeReps;

        if (rep > recordReps && weight > recordWeight) {
            const category = "Both";
            await updateUserExerciseRecord(exerciseID, rep, weight, category);
            return "Both";
        } else if (rep > recordReps) {
            const category = "Reps";
            await updateUserExerciseRecord(exerciseID, rep, weight, category);
            return "Volume";
        } else if (weight > recordWeight) {
            const category = "Weight";
            await updateUserExerciseRecord(exerciseID, rep, weight, category);
            return "Weight";
        } else {
            return "None";
        }

    }


    return { getUserExerciseRecord, PRanator }
}

export default UserExerciseRecordManager;