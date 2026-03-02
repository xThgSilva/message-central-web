import React from "react";
import AuthRegisterComponent from "../components/AuthRegisterComponent";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <AuthRegisterComponent
            pageTitle="Login"
            auxiliaryText="Welcome again!"
            linkText={"Don't have an account? Register"}
            toPage={"/register"}
            childrenButtons={
                <>
                    <button type="button">Sign in</button>
                    <Link to={"/register"} className="register-link">Don't have an account? Register</Link>
                </>}
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