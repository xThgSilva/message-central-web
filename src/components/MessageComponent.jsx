import React from "react";
import "../styles/MessageComponent/style.css"

const MessageComponent = ({ message, isOwnMessage }) => {

    function dataFormatAndRevertToLocale(data) {
        let dayFormat = data.substring(0, 10);
        return dayFormat.split('-').reverse().join("/");
    }

    return (
        <>
            <div className="message-container">
                <div className={`message ${isOwnMessage ? "own-message" : "user-message"}`}>
                    <p>{message.content}</p>
                    <i>{dataFormatAndRevertToLocale(message.sendAt)}</i>
                </div>
            </div>
        </>
    )
}

export default MessageComponent;