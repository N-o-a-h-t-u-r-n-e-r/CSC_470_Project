interface Props {

}

const StartWorkout = (props: Props) => {

    return(
        <div className="start-workout-container">
            <div className="start-workout-header">
                <h1>Start Workout</h1>
            </div>
            <div className="start-workout-body">
                <h2>Presets:</h2>
            </div>
            <div className="start-blank-workout-button">
                <button className='nav-buttons'><h3>Start Blank Workout</h3></button>
            </div>
        </div>
    );

}

export default StartWorkout;