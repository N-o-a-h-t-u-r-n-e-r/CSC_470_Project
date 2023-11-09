import React, { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

import "./styles.css";

import Landing from "./Pages/Landing/Landing";
import StartWorkout from "./Pages/Workout/StartWorkout";

const App = () => {

  const { loggedIn } = useContext(AuthContext)

  return (
    <>
      {loggedIn ? 
        <StartWorkout />
      :
        <Landing />
      }
    </>
  );
};

export default App;
