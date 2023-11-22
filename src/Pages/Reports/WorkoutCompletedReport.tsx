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
    workoutTitle: string  | null;
    time: number;
    trigger: boolean | null;
    setTrigger: (value: boolean) => void;
    exercises: Exercise[] | null;
    pr: Prs[] | null;

}

const WorkoutCompletedReport = (props: Props) => {

    //Display time in a HH:MM:SS fashion from a still number.
    const hours = Math.floor(props.time / 3600);
    const minutes = Math.floor((props.time % 3600) / 60);
    const seconds = props.time % 60;
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    //const [workout, setWorkout] = useState(props.workout);

    return (props.trigger) ? (
        <div className="reports-popup-box">
            <div className="reports-box">
             <button className="reports-workout-button" onClick={() => props.setTrigger(false)}> X </button>
                <div className="reports-header">
                {props.workoutTitle !== null ? (
                    <h1>Workout "{props.workoutTitle}" completed!</h1>
                ) : (
                  <h1>Workout Completed</h1>
                 )}
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
                {props.exercises !==  null ? (
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
                ) :  (
                  <h1></h1>
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

