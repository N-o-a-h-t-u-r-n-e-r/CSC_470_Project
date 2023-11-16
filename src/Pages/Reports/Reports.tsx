import React from 'react'

interface Exercise {
    title: string;
    sets: number;
    reps: number;
    weight: number
}
interface Prs {
    title: string;
    volume: number;
    weight: number;
    category: string;
}

interface Props {
    workoutTitle: string;
    time: number;
    trigger: boolean;
    setTrigger: (value: boolean) => void;
    exercises: Exercise[];
    pr: Prs[] | null;

}




const Reports = (props: Props) => {

    //Display time in a HH:MM:SS fashion from a still number.
    const hours = Math.floor(props.time / 3600);
    const minutes = Math.floor((props.time % 3600) / 60);
    const seconds = props.time % 60;
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (props.trigger) ? (
        <div className="reports-popup-box">
            <div className="reports-box">
             <button className="reports-workout-button" onClick={() => props.setTrigger(false)}> X </button>
                <div className="reports-header">
                    <h1>Workout "{props.workoutTitle}" completed!</h1>
                </div>
                    <div className="reports-divider"></div>
                    
                    
                    <div className="reports-time-left">
                        <p>Time:</p>
                    </div>

                    <div className="reports-time-right">
                        <p>{formattedTime}</p>
                    </div>
                    
                    <div className="reports-exercise-list-header">
                        <p>Exercises Completed:</p>
                    </div>
                   
                    <div className="reports-exercise-list">
                        {props.exercises.map((exercise, index) => (
                            <ul key={index}>
                                <div className="exercise-info">
                                    <div className="list-title">{exercise.title}:</div>
                                    <div className="setsNreps">{exercise.sets}x{exercise.reps}</div>
                                </div>
                            </ul>
                        ))}
                    </div>

                    {props.pr !== null && props.pr.length > 0 && (
                        <>
                            <div className="reports-exercise-pr">
                                <p>PRs set:</p>
                            </div>
                            {props.pr.map((prs, index) => (
                            <ul key={index}>
                                
                                <div className="pr-info">
                                    <div className="pr-title"> 
                                        {prs.title}: 
                                    </div>
                                    <div className="pr-content">
                                        {prs.weight}lb x {prs.volume} - {prs.category}
                                    </div>
                                </div>
                            </ul>
                            ))}

                        </>
                    )}

                    


                
            </div>
        </div>
    ) : null;
}

export default Reports;


/* need to import usestate for button
import React, { useContext, useState } from "react";


/* button code
const [buttonPopup, setButtonPopup] = useState(false);

<button onClick={() => setButtonPopup(true)}>Open Popup</button>
        <Reports
          pr={prs}
          exercises={exercises}
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
          workoutTitle="PROWORKOUT1"
          time={1000}
        />



/* test array for exercises
const exercises = [
  {title: 'Bench', sets: 5, reps: 12, weight: 10},
  {title: 'Squats', sets: 5, reps: 5, weight: 20},
  {title: 'Curls', sets: 4, reps: 10, weight: 30}
];

/* test array for Prs
const prs = [
  {title: 'Bench', volume: 123, weight: 10, category: "Volume"},
  {title: 'Squats', volume: 20, weight: 100, category: "Weight"},
  {title: 'Curls', volume: 10, weight: 30, category: "Mental"}
]

/* css
/************ reports.tsx ***********/
/*
.reports-popup-box {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh; 
  
  
  }
  .reports-box {
      position: relative;
      width: 50%;
      min-height: 300px;
      background-color: #fff;
      border: 1px solid #999;
      border-radius: 4px;
      margin: 20px auto;
      padding: 20px;
      overflow: auto;
    }
  .reports-divider{
    border-top: 3px solid #bbb;
  }
  .reports-time-left{
    padding: 10px;
    float: left;
  }
  .reports-time-right{
    float: right;
    padding: 10px;
  }
  .reports-exercise-list-header{
    clear: left;
    padding: 10px;
  }
  
  .reports-exercise-list {
    display: flex;
    flex-direction: column;
  }
  
  .reports-exercise-list ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .exercise-info {
    display: flex;
    justify-content: space-between;
    align-items: right;
    padding-right: 10px;
  }
  
  .list-title {
    padding-left: 30%;
  }
  
  .setsNreps {
    padding-right: 20%;
    
  }
  
  .reports-exercise-pr{
    clear: left;
    padding: 10px;
  }
  .pr-info{
    display: flex;
    justify-content: space-between;
    align-items: right;
    padding-right: 10px;
  }
  .pr-title{
    padding-left: 30%;
  }
  .pr-content{
    padding-right: 20%;
  }
  
  .reports-workout-button {
      cursor: pointer;
      border: 1px solid #999;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      box-sizing: border-box;
      position: fixed;
      right: calc(25% - 5px);
      top: 15px;
    }




*/



