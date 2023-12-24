import React from "react";

const HiddenComment = () => {
    return (
        <>
            <div className="comment">
                <div className="header">
                    <span className="name">Hidden User</span>
                    <span className="date">Hidden Date</span>
                </div>
                <div className="content">
                    <p>This comment has been hidden</p>
                </div>
            </div>
        </>
    );
}

export default HiddenComment;