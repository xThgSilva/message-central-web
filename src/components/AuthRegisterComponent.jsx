import React from "react";
import "../styles/AuthRegisterComponent/style.css"
import { Link } from "react-router-dom";

const AuthRegisterComponent = ({ pageTitle, auxiliaryText, children, childrenButtons }) => {
    return (
        <>
            <div className="container">
                <form className="login-container">
                    <div className="header-login">
                        <h1>{pageTitle}</h1>
                        <p>{auxiliaryText}</p>
                    </div>

                    <div className="inputs-container">
                        {children}
                    </div>

                    {childrenButtons}
                </form>
            </div>
        </>
    )
}

export default AuthRegisterComponent;