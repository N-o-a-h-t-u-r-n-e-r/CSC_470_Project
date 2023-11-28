import React, {useEffect, useState} from 'react'
import { Workout } from "../../Models/Workout";
import { Exercise } from "../../Models/Exercise";
import { Set } from '../../Models/Set';
import SetManager from '../../Managers/SetManager';


interface Prs {
    title: string;
    volume: number;
    weight: number;
    category: string;
}

interface Props {
    workout?: Workout;
    time: number;
    handleClose: () => void;
    exercises: Exercise[] | null;
    pr: Prs[] | null;
}

const WorkoutCompletedReport = (props: Props) => {
    const setManager = SetManager();
    const [setData, setSetData] = useState<Set | null>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const setId = props.exercises?.[0]?.SetIDs.split(',')[0] || '';
            const set = await setManager.getSets(setId);
            console.log(set);
            
            if (set) {
              setSetData(set);
            } else {
              setSetData(null);
            }
          } catch (error) {
            console.error('Error fetching set:', error);
          }
        };
      
        fetchData();
      }, [props.exercises]);

    
    return (
        <div className="reports-popup-box">
            <div className="reports-box">
             <button className="reports-workout-button" onClick={() => props.handleClose()}> X </button>
                <div className="reports-header">
                    <h1>{props.workout?.Title !== undefined ? `Workout "${props.workout?.Title}" completed!` : "Workout Completed"}</h1>
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

                {props.exercises !==  null ? 
                    <div className="reports-exercise-list">
                        {props.exercises.map((exercise, index) => (
                            <ul key={index}>
                                <div className="exercise-info">
                                    <div className="list-title">{exercise.Title}:</div>
                                    <div className="setsNreps">
                                    {exercise.SetIDs.split(',').map((setId, index) => (
                                        <div key={index}>
                                        {setData?.NumberReps} x {setData?.Weight}
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            </ul>
                        ))}
                    </div>
                : 
                    <div className="list-title">None</div>
                }

                {props.pr !== null && props.pr.length > 0 && 
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
                }                
            </div>
        </div>
    );
}

export default WorkoutCompletedReport;

