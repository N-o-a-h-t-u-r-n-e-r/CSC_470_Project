import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

interface Props {

}

const Login = (props: Props) => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div className="login-container">
            <div className="login-header">
                <h2>Login</h2>
            </div>
            <div className="login-body">
                <input className="login-input" type="text" placeholder="Email"></input>
                <input className="login-input" type="text" placeholder="Password"></input>
            </div>
            <div className="login-submit">
                <button className="login-button" onClick={() => loginWithRedirect()}>Login</button>
                <a className="login-signup" href="/signup">Sign up instead?</a>
            </div>
        </div>
    );
}

export default Login;