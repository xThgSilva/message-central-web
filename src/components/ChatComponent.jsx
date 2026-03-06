import React, { useEffect, useState } from "react";
import "../styles/ChatComponent/style.css"
import { FaPaperPlane } from "react-icons/fa";
import MessageComponent from "./MessageComponent";

const ChatComponent = ({ user }) => {

    const [userLogged, setUserLogged] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const token = sessionStorage.getItem("token");

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
                        setUserLogged(data);
                    }
                    else {
                        throw new Error("[ERROR] Error finding user login information.");
                    }
                } catch (error) {
                    console.log(`[ERROR]: ${error}`);
                }
            }

            getUserInformations();
        }
    }, [])

    useEffect(() => {
        if (!userLogged)
            return;

        async function renderUserMessages() {
            try {
                const response = await fetch(
                    `http://localhost:8080/message/conversation/${userLogged.id}/${user.id}`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setMessages(data);
                }

            } catch (error) {
                console.log(error);
            }
        }

        renderUserMessages();
    }, [user]);

    async function sendMessage() {
        try {
            const response = await fetch("http://localhost:8080/message/send", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    senderUserId: userLogged.id,
                    recipientUserId: user.id,
                    content: message
                })
            });

            if (response.ok) {
                setMessage("");
            }
            else {
                throw new Error(`Error to send message to ${user.name}`);
            }

        } catch (error) {
            alert("Check console");
            console.log(`[ERROR]: ${error}`)
        }
    }

    return (
        <>
            <section className="chat-container">
                <h1 className="chat-username">{user.name}</h1>

                <div className="messages-container">
                    {
                        messages.map(m => (
                            <MessageComponent
                                key={m.id}
                                message={m}
                                isOwnMessage={m.senderUserId === userLogged.id}
                            />
                        ))
                    }
                </div>

                <div className="send-message-bottom">
                    <input type="text" placeholder="Type a message..." value={message} onChange={(event) => setMessage(event.target.value)} />
                    <button onClick={() => sendMessage()}><FaPaperPlane></FaPaperPlane></button>
                </div>
            </section>
        </>
    )
}

export default ChatComponent;