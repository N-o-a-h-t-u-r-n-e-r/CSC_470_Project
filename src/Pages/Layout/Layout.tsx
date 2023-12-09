import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { AuthContext } from '../../Context/AuthContext';
import Bars from '../../Assets/Bars';

interface Props {
    
}

const Layout: React.FC<React.PropsWithChildren<Props>> = (props) => {

    const { user, isLoading, loginWithRedirect, logout } = useAuth0();
    const { loggedIn, setLoggedIn } = useContext(AuthContext);

    const [showNavOptions, setShowNavOptions] = useState(false);

    useEffect(() => {
        if(user)
            setLoggedIn(true);
    }, [user])

    if (isLoading) {
        return (
            <div>
                <svg className="spinner-absolute" viewBox="0 0 50 50">
                    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                </svg>
            </div>
        );
    }

    return (
        <>
            <div className='layout-header'>
                <div className='top-layout-row'>
                    {loggedIn && 
                        <button className='nav-button' onClick={() => setShowNavOptions(!showNavOptions)}><Bars/></button>
                    }
                    <h1>Gym Rat Lab</h1>
                    {loggedIn ?
                        <button className='user-login' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}><h3>Logout</h3></button>
                    :
                        <button className='user-login' onClick={() => loginWithRedirect()}><h3>Login</h3></button>
                    }
                </div>
                {showNavOptions && 
                    <div className='nav-options'>
                        <a className='link' href='/StartWorkout'>Preset Plans</a>
                        <a className='link' href='/WorkoutPlans'>User Plans</a>
                        <a className='link' href='/UserProgress'>User Progress</a>
                    </div>
                } 
            </div>
            <div className='layout-body'>
                {props.children}
            </div>
        </>
    );
}

export default Layout;