export interface Exercise {
    [key: string]: any;
    ExerciseID: string;
    UserID: string;
    Title: string;
    Description: string;
    MuscleGroup: string;
    TutorialID: number;
    Date: Date;
    SetIDs: string;
    RPETarget: number;
    UserExerciseRecordIDs: string;
}