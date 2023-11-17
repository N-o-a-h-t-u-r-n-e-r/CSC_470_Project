export interface UserGoal {
    [key: string]: any;
    GoalID: number;
    UserID: string;
    Title: string;
    TargetWeight: number;
    TargetReps: number;
    StartDate: Date;
    TargetDate: Date;
}