import React, { useState } from "react";
import AuthRegisterComponent from "../components/AuthRegisterComponent";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleLogin() {
        try {
            setLoading(true)
            const response = await fetch(`http://localhost:8080/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert(`${data.message}`);
                sessionStorage.setItem("token", data.token);
                setLoading(false)
                setEmail("");
                setPassword("");
                navigate("/home");
            }
            else {
                throw new Error("Login error")
            }
        } catch (error) {
            console.log("[EROR]: " + error)
            setLoading(false)
        }
    }

    return (
        <AuthRegisterComponent
            pageTitle="Login"
            auxiliaryText="Welcome again!"
            linkText={"Don't have an account? Register"}
            toPage={"/register"}
            childrenButtons={
                <>
                    <button type="button" onClick={handleLogin}>
                        {loading ? <div className="loading-div"></div> : "Sign in"}
                    </button>
                    <Link to={"/register"} className="register-link">Don't have an account? Register</Link>
                </>}
        >
            <div className="input-container">
                <label htmlFor="">Email</label>
                <input type="email" onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="input-container">
                <label htmlFor="">Password</label>
                <input type="password" onChange={(event) => setPassword(event.target.value)} />
            </div>
        </AuthRegisterComponent>
    )
}