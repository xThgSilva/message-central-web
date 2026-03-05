import React from "react";

const MessageComponent = ({message}) => {
    return(
        <>
            <h1>{message.content}</h1>
        </>
    )
}

export default MessageComponent;