export interface Workout {
    [key: string]: any;
    WorkoutID: number;
    UserID: number;
    Title: string;
    Description: string;
    Date: Date;
    Exercise_Ds: string;
    TimeElapsed: Date;
    PresetWorkoutID: number | undefined;
}