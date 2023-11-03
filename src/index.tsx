import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import "./styles.css";
import Layout from "./Layout/Layout";

const container = document.getElementById('root');
const root = createRoot(container!); 

root.render(
    <Router>
        <Layout>
            <Routes>
                {/* <Route path="/" element={
                    <App />
                }/>
                <Route path="/landing" element={
                    <Landing />
                }/> */}
            </Routes>
        </Layout>
    </Router>    
);