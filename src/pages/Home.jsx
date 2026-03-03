import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home/style.css"

export default function Home() {
    const navigate = useNavigate();

    function handleLogout() {
        sessionStorage.removeItem("token");
        navigate("/");
    }

    return (
        <>
            <div className="home-container">
                <header>
                    <h2>Home</h2>
                    <h1>Message Central</h1>
                    <p>Welcome, User!</p>
                    <button onClick={handleLogout}>Logout</button>
                </header>
                <main className="main-container">
                    <section className="users-list">
                        <h1>Users List</h1>
                        <input type="text"placeholder="Find a user..." />
                    </section>
                    <section className="chat-section">
                        <h1>Chat Section</h1>
                    </section>
                </main>
            </div>
        </>
    )
}