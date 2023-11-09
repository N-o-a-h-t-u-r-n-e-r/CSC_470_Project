import React, { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

import "./styles.css";

import Landing from "./Pages/Landing/Landing";

const App = () => {

  const { loggedIn } = useContext(AuthContext)

  return (
    <>
      {loggedIn ? 
        <div className="app">
        </div>
      :
        <Landing />
      }
    </>
  );
};

export default App;
