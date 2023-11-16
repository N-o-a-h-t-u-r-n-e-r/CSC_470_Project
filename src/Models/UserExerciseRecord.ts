export interface UserExerciseRecord {
    [key: string]: any;
    UserExerciseRecordID: number;
    ExerciseID: number;
    UserID: number;
    MaxWeight: number;
    MaxWeightReps: number;
    MaxWeightDate: Date;
    MaxVolumeReps: number;
    MaxVolumeWeight: number;
    MaxVolumeDate: Date;
}