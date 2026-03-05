import React, { useEffect, useState } from "react";
import "../styles/ChatComponent/style.css"
import { FaPaperPlane } from "react-icons/fa";
import MessageComponent from "./MessageComponent";

const ChatComponent = ({ user }) => {

    const [userLogged, setUserLogged] = useState(null);
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
    })

    useEffect(() => {
        if (!userLogged) 
            return;

        async function renderUserMessages() {
            try {
                const response = await fetch(
                    `http://localhost:8080/message/conversation/${user.id}/${userLogged.id}`,
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
    }, [userLogged]);

    return (
        <>
            <section className="chat-container">
                {/* To test */}
                <h1>{user.name}</h1>

                <div className="messages-container">
                    {
                        messages.map(m => (
                            <MessageComponent
                                key={m.id}
                                message={m}
                            />
                        ))
                    }
                </div>

                <div className="send-message-bottom">
                    <input type="text" placeholder="Type a message..." />
                    <button><FaPaperPlane></FaPaperPlane></button>
                </div>
            </section>
        </>
    )
}

export default ChatComponent;