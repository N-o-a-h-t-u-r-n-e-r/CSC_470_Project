import React, { useRef } from "react";

import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "./firebase_setup/firebase"

import "./styles.css";

const App = () => {
  const dataRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const ref = collection(firestore, "test") 
    
    try {
        addDoc(ref, {data: dataRef.current!.value})
    } catch(err) {
        console.log(err)
    }
  
    dataRef.current!.value = "";
  }

  return (
    <div className="app-container">
        <div className="app-header">
          <h1>Header Content Goes Here</h1>
        </div>
        <div className="app-content">
            <h1>Hello world</h1>
            <form onSubmit={handleSubmit}>
              <input type="text" ref={dataRef} />
              <button type="submit">Save</button>
              <button type="button">Click Me!</button>
            </form>
        </div>
        <div className="app-footer">
          <h1>Footer Content Goes Here</h1>
        </div>
    </div>
  );
};

export default App;
