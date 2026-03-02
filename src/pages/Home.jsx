import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    function handleLogout() {
        sessionStorage.removeItem("token");
        navigate("/");
    }

    return(
        <>
            <h1>Home</h1>
            <button onClick={() => handleLogout()}>Logout</button>
        </>
    )
}