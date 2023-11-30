import { CompletedSet } from "./CompletedSet";

export interface Workout {
    [key: string]: any;
    WorkoutID: string;
    UserID: string;
    Title: string;
    Description: string;
    Date: Date;
    ExerciseIDs: string;
    TimeElapsed: Date;
    PresetWorkoutID: number | undefined;
}