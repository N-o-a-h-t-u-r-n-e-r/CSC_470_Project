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
            <Route path="/" element={
                <App />
            }/>
            <Route path="/landing" element={
                <Landing />
            }/>
        </Routes>
    </Router>
);