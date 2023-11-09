import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";

import Layout from "./Pages/Layout/Layout";
import App from "./app";
import { AuthProvider } from "./Context/AuthContext";

import "./styles.css";

const container = document.getElementById('root');
const root = createRoot(container!); 

root.render(
    <Router>
        <Auth0Provider domain={process.env.REACT_APP_auth0_domain!} clientId={process.env.REACT_APP_auth0_client_id!} authorizationParams={{ redirect_uri: window.location.origin }}>
            <AuthProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={
                            <App />
                        }/>
                    </Routes>
                </Layout>
            </AuthProvider>
        </Auth0Provider>
    </Router>    
);