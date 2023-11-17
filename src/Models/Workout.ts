export interface Workout {
    [key: string]: any;
    WorkoutID: number;
    UserID: string;
    Title: string;
    Description: string;
    Date: Date;
    ExerciseIDs: string;
    TimeElapsed: Date;
    PresetWorkoutID: number | undefined;
}