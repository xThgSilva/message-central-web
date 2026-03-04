import React from "react";
import "../styles/UserCard/style.css"

const UserCard = ({name}) => {
    return (
        <>
            <div className="user-info-container">
                <p>{name}</p>
                <button>Send a message</button>
            </div>
        </>
    )
}

export default UserCard;