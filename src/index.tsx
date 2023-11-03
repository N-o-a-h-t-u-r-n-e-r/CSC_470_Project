import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from "./Layout/Layout";
import App from "./app";
import "./styles.css";

const container = document.getElementById('root');
const root = createRoot(container!); 

root.render(
    <Router>
        <Layout>
            <Routes>
                <Route path="/" element={
                    <App />
                }/>
            </Routes>
        </Layout>
    </Router>    
);