import React from "react";
import AuthRegisterComponent from "../components/AuthRegisterComponent";

export default function Login() {
    return (
        <AuthRegisterComponent
            pageTitle="Login"
            auxiliaryText="Welcome again!"
            actionButton={"Sign in"}
            linkText={"Don't have an account? Register"}
        >
            <div className="input-container">
                <label htmlFor="">Email</label>
                <input type="email" />
            </div>
            <div className="input-container">
                <label htmlFor="">Password</label>
                <input type="password" />
            </div>
        </AuthRegisterComponent>
    )
}