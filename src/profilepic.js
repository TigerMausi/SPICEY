import React from "react";

export default function profilePic(props) {
    const image = props.image || "./images/profile_pic.png";
    return (
        <img
            className="profile-pic"
            src={image}
            alt={`${props.first} ${props.last}`}
            onClick={props.onClick}
        />
    );
}
