export interface Workout {
    [key: string]: any;
    Workout_ID: number;
    User_ID: number;
    Title: string;
    Description: string;
    Date: Date;
    Exercise_IDs: string;
    Time_Elapsed: Date;
    Preset_Workout_ID: number | undefined;
}