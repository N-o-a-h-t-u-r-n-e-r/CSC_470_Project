import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from "./Context/AuthContext";

import "./styles.css";
import Layout from "./Pages/Layout/Layout";
import App from "./app";
import StartWorkout from './Pages/Workout/StartWorkout';
import WorkoutPlans from './Pages/Plans/WorkoutPlans';
import UserProgress from './Pages/Progress/UserProgress';

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
                        <Route path="/StartWorkout" element={
                            <StartWorkout />
                        }/>
                        <Route path="/WorkoutPlans" element={
                            <WorkoutPlans />
                        }/>
                        <Route path="/UserProgress" element={
                            <UserProgress />
                        }/>
                    </Routes>
                </Layout>
            </AuthProvider>
        </Auth0Provider>
    </Router>    
);