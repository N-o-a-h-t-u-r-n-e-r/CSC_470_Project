import React, {useEffect, useState} from 'react'
import { Workout } from "../../Models/Workout";
import { Exercise } from "../../Models/Exercise";
import SetManager from "../../Managers/SetManager"
import { Set } from '../../Models/Set';



interface Prs {
    title: string;
    volume: number;
    weight: number;
    category: string;
}

interface Props {
    workout?: Workout;

    time: number;
    trigger: boolean | null;
    setTrigger: (value: boolean) => void;
    exercises: Exercise[] | null;
    pr: Prs[] | null;

}




const WorkoutCompletedReport = (props: Props) => {
    
    return (props.trigger) ? (
        <div className="reports-popup-box">
            <div className="reports-box">
             <button className="reports-workout-button" onClick={() => props.setTrigger(false)}> X </button>
                <div className="reports-header">
                {props.workout?.Title !== undefined ? (
                    <h1>Workout "{props.workout?.Title}" completed!</h1>
                ) : (
                  <h1>Workout Completed</h1>
                 )}
                </div>
                <div className="reports-divider"></div>
                
                
                <div className="reports-time-left">
                    <p>Time:</p>
                </div>

                <div className="reports-time-right">
                    <p>{new Date(props.time * 1000).toISOString().slice(11, 19)}</p>
                </div>
                
                <div className="reports-exercise-list-header">
                    <p>Exercises Completed:</p>
                </div>
                {props.exercises !==  null ? (
                  <div className="reports-exercise-list">
                      {props.exercises.map((exercise, index) => (
                          <ul key={index}>
                              <div className="exercise-info">
                                  <div className="list-title">{exercise.Title}:</div>
                                  <div className="setsNreps">
                                    {exercise.SetIDs.split(',').map((setId, index) => (
                                        <div key={index}>{setId}</div>
                                    ))}
                                  </div>
                              </div>
                          </ul>
                     ))}
                  </div>
                ) :  (
                  <div className="list-title">None</div>
                )
              }

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

export default WorkoutCompletedReport;

