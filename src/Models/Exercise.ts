export interface Exercise {
    [key: string]: any;
    ExerciseID: number;
    UserID: number;
    Title: string;
    Description: string;
    MuscleGroup: string;
    TutorialID: number;
    Date: Date;
    SetIDs: string;
    RPETarget: number | undefined;
    UserExerciseRecordIDs: string;
}