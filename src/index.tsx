import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import "./styles.css";
import App from "./app";
import Landing from "./landing/landing";

const container = document.getElementById('root');
const root = createRoot(container!); 

root.render(
    <Router>
        <Routes>
            <Route path="/liv" element={
                <div className="app-container">
                    <div className="app-header">
                    </div>
                    <div className="app-content">
                        <h1>Hello Liv</h1>
                        <h1 style={{color: "red"}}>I Love you</h1>
                        <h1 style={{color: "red"}}>&#60;3</h1>
                    </div>
                    <div className="app-footer">
                    </div>
                </div>
            }/>
            <Route path="/" element={
                <App />
            }/>
            <Route path="/landing" element={
                <Landing />
            }/>
        </Routes>
    </Router>
);