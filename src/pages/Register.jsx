import React from "react";
import AuthRegisterComponent from "../components/AuthRegisterComponent";

export default function Login() {
    return (
        <AuthRegisterComponent
            pageTitle="Register"
            auxiliaryText="Be welcome!"
            actionButton={"Create account"}
            linkText={"Already have an account? Login"}
            toPage={"/"}
        >
            <div className="input-container">
                <label htmlFor="">Name</label>
                <input type="text" />
            </div>
            <div className="input-container">
                <label htmlFor="">Email</label>
                <input type="email" />
            </div>
            <div className="input-container">
                <label htmlFor="">Create a password</label>
                <input type="password" />
            </div>
        </AuthRegisterComponent>
    )
}