import React, { useState } from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from "./Pages/Layout/Layout";
import App from "./app";
import "./styles.css";
import Signup from "./Pages/Login/Signup";
import { Auth0Provider } from "@auth0/auth0-react";

const container = document.getElementById('root');
const root = createRoot(container!); 

var loggedIn = false;

const handleSetLoggedIn = (input: boolean) => {
    loggedIn = input;
}

root.render(
    <Router>
        <Auth0Provider domain="dev-1fus85o1auv0j6od.us.auth0.com" clientId="pJl3hZid0waWcbWkADbaE8NjpSawNrUf" authorizationParams={{ redirect_uri: window.location.origin }}>
            <Layout loggedIn={loggedIn}>
                <Routes>
                    <Route path="/" element={
                        <App setLoggedIn={handleSetLoggedIn} />
                    }/>
                    <Route path="/signup" element={
                        <Signup />
                    }/>
                </Routes>
            </Layout>
        </Auth0Provider>
    </Router>    
);