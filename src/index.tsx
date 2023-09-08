import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import "./styles.css";
import App from "./App";

const container = document.getElementById('app');
const root = createRoot(container!); 

root.render(
    <Router>
        <Routes>
            <Route path="/about" element={
                <div>
                    <h1>About Us</h1>
                    <p>This is the about page content.</p>
                </div>
            } />
            <Route path="/" element={
                <App />
            } />
        </Routes>
    </Router>
);