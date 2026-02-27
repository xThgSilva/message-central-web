import React from "react";
import "../styles/AuthRegisterComponent/style.css"

const AuthRegisterComponent = ({ pageTitle, auxiliaryText, children, actionButton, linkText }) => {
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

                    <button>{actionButton}</button>
                    <a href="" className="register-link">{linkText}</a>
                </form>
            </div>
        </>
    )
}

export default AuthRegisterComponent;