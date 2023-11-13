export interface Exercise {
    [key: string]: any;
    Exercise_ID: number;
    User_ID: number;
    Title: string;
    Description: string;
    Muscle_Group: string;
    Tutorial_ID: number;
    Date: Date;
    Set_IDs: string;
    RPE_Target: number | undefined;
    User_Exercise_Record_IDs: string;
}