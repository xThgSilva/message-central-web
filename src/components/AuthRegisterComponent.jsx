import React from "react";
import "../styles/AuthRegisterComponent/style.css"
import { Link } from "react-router-dom";

const AuthRegisterComponent = ({ pageTitle, auxiliaryText, children, actionButton, linkText, toPage }) => {
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

                    <button type="button">{actionButton}</button>
                    <Link to={toPage} className="register-link">{linkText}</Link>
                </form>
            </div>
        </>
    )
}

export default AuthRegisterComponent;