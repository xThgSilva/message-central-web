import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home/style.css"
import UserCard from "../components/UserCard";
import ChatComponent from "../components/ChatComponent";

export default function Home() {
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [userSelected, setUserSelected] = useState(null);
    const [searchUser, setSearchUser] = useState("");

    const token = sessionStorage.getItem("token");

    function handleLogout() {
        sessionStorage.removeItem("token");
        navigate("/");
    }

    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }
        else {
            async function getUserInformations() {
                try {
                    const response = await fetch(`http://localhost:8080/user/me`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    const data = await response.json();

                    if (response.ok) {
                        setUsername(data.name);
                    }
                    else {
                        throw new Error("[ERROR] Error finding user login information.");
                    }
                }
                catch (error) {
                    console.log(`[ERROR]: ${error}`);
                }
            }

            getUserInformations();
        }
    }, []);

    useEffect(() => {
        async function handleFindUsers() {

            const response = await fetch(
                `http://localhost:8080/user?name=${searchUser}&page=${page}&size=3`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setUsers(data.content);
                setTotalPages(data.totalPages);
            }
        }

        handleFindUsers();

    }, [page, searchUser]);

    return (
        <>
            <div className="home-container">
                <header>
                    <h2>Home</h2>
                    <h1>Message Central</h1>
                    <p>Welcome, {username}!</p>
                    <button onClick={handleLogout}>Logout</button>
                </header>
                <main className="main-container">
                    <section className="users-section">
                        <h2>Available Users</h2>
                        <input type="text" value={searchUser} onChange={(event) => setSearchUser(event.target.value)} placeholder="Find a user..." />
                        <div className="users-list">
                            {
                                users.length === 0 ?
                                    <p className="no-registered-users">There are not registered users.</p>
                                    : (
                                        <>
                                            {
                                                users.map(user => (
                                                    <UserCard
                                                        key={user.id}
                                                        user={user}
                                                        onSelect={() => setUserSelected(user)}
                                                    />
                                                ))
                                            }
                                            <div className="page-guide">
                                                <p>Page {page} of {totalPages - 1}</p>
                                                <div className="page-guide-buttons">
                                                    <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous page</button>
                                                    <button onClick={() => setPage(page + 1)} disabled={page === totalPages - 1} >Next page</button>
                                                </div>
                                            </div>
                                        </>
                                    )
                            }
                        </div>
                    </section>
                    <section className="chat-section">
                        <h2>Your Chat</h2>
                        {
                            userSelected == null ?
                                <p className="choose-someone">Choose someone to start a conversation with.</p>
                                :
                                <>
                                    <ChatComponent
                                        user={userSelected}
                                    />
                                </>
                        }
                    </section>
                </main>
            </div>
        </>
    )
}