import React, { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

import "./styles.css";

import Landing from "./Pages/Landing/Landing";

interface Props {
}

const App = (props: Props) => {

  const { loggedIn, setLoggedIn } = useContext(AuthContext)

  // import { addDoc, collection } from "@firebase/firestore"
  // import { firestore } from "./firebase_setup/firebase"

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  
  //   const testCollectionRef = collection(firestore, "test") 

  //   const data = {data: "ok"}
    
  //   try {
  //       addDoc(testCollectionRef, data)
  //   } catch(err) {
  //       console.log(err)
  //   }
  
  //   dataRef.current!.value = "";
  // }

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
