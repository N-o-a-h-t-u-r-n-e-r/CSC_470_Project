import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

import "./styles.css";

import Landing from "./Pages/Landing/Landing";

const App = () => {

  const { loggedIn } = useContext(AuthContext)

  return (
    <>
      {loggedIn ? 
        <Navigate to="/StartWorkout" replace />
      :
        <Landing />
      }
    </>
  );
};

export default App;
