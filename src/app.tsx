import React from "react";

import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "./firebase_setup/firebase"

import "./styles.css";

const App = () => {

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

  return (
    <div className="app">
    </div>
  );
};

export default App;
