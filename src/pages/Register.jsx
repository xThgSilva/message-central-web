import React, { useState } from "react";
import AuthRegisterComponent from "../components/AuthRegisterComponent";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    async function handleRegisterUser() {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:8080/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });

            if (response.ok) {
                alert("Register Sucesfully.")
                setName("");
                setEmail("");
                setPassword("");
                setLoading(false)
                navigate("/login")
            }
            else {
                throw new Error("Error to register");
            }
        }
        catch (error) {
            console.log("[ERROR]: " + error);
        }
    }
    return (
        <AuthRegisterComponent
            pageTitle="Register"
            auxiliaryText="Be welcome!"
            actionButton={"Create account"}
            linkText={"Already have an account? Login"}
            childrenButtons={
                <>
                    <button onClick={() => handleRegisterUser()} type="button">
                        {
                            loading == true ? "Loading...": "Register"
                        }
                    </button>
                    <Link to={"/"} className="register-link">Already have an account? Login</Link>
                </>}
        >
            <div className="input-container">
                <label htmlFor="">Name</label>
                <input type="text" onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="input-container">
                <label htmlFor="">Email</label>
                <input type="email" onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="input-container">
                <label htmlFor="">Create a password</label>
                <input type="password" onChange={(event) => setPassword(event.target.value)} />
            </div>
        </AuthRegisterComponent>
    )
}