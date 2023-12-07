import { Set } from "./Set";

export interface ExerciseWithSet {
    [key: string]: any;
    UserID: string;
    Title: string;
    Description: string;
    MuscleGroup: string;
    Date: Date;
    Sets: Set[];
}