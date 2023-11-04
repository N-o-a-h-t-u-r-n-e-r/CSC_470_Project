import React, { useState } from "react";

import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "./firebase_setup/firebase"

import "./styles.css";
import Login from "./Pages/Login/Login";

interface Props {
  setLoggedIn: (input: boolean) => void,
}

const App = (props: Props) => {

  const [loginToken, setLoginToken] = useState();
  const [loggedIn, _setLoggedIn] = useState(false);
  const setLoggedIn = (input: boolean) => {
    props.setLoggedIn(input);
    _setLoggedIn(input);
  }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  
  //   const ref = collection(firestore, "test") 
    
  //   try {
  //       addDoc(ref, {data: dataRef.current!.value})
  //   } catch(err) {
  //       console.log(err)
  //   }
  
  //   dataRef.current!.value = "";
  // }

  // <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
  //   Log Out
  // </button>

  return (
    <>
      {loggedIn ? 
        <div className="app">
        </div>
      :
        <Login/>
      }
    </>
  );
};

export default App;
