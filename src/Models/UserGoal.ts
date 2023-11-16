export interface UserGoal {
    [key: string]: any;
    GoalID: number;
    UserID: number;
    Title: string;
    TargetWeight: number;
    TargetReps: number;
    StartDate: Date;
    TargetDate: Date;
}