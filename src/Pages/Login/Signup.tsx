import React from "react";

interface Props {

}

const Signup = (props: Props) => {

    return (
        <div className="login-container">
            <div className="login-header">
                <h2>Sign Up</h2>
            </div>
            <div className="login-body">
                <input className="login-input" type="text" placeholder="First Name"></input>
                <input className="login-input" type="text" placeholder="Last Name"></input>
                <input className="login-input" type="text" placeholder="User Name"></input>
                <input className="login-input" type="text" placeholder="Email"></input>
                <input className="login-input" type="text" placeholder="Create Password"></input>
                <input className="login-input" type="text" placeholder="Confirm Password"></input>
            </div>
            <div className="login-submit">
                <button className="login-button">Sign Up</button>
                <a className="login-signup" href="/">Login instead?</a>
            </div>
        </div>
    );
}

export default Signup;