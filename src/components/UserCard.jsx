import React from "react";
import "../styles/UserCard/style.css"

const UserCard = ({user, onSelect}) => {
    return (
        <>
            <div className="user-info-container">
                <p>{user.name}</p>
                <button onClick={onSelect}>Send a message</button>
            </div>
        </>
    )
}

export default UserCard;