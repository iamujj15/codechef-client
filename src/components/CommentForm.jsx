import React from "react";
import { useState } from "react";
import { IoSend } from "react-icons/io5";

export const CommentForm = ({
    loading,
    alertForm,
    onSubmit,
    initValue = "",
    autoFocus = false,
    blogHandler
}) => {
    const [message, setMessage] = useState(initValue);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(message);

        if (blogHandler !== undefined) {
            await blogHandler();
        }

        setMessage(initValue);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="comment-form-row">
                <textarea
                    autoFocus={autoFocus}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="message-input"
                    maxLength={250}
                />
                <button className="btnC" type="submit" disabled={loading}>
                    {loading ? "Loading" : <IoSend style={{ width: "30px", height: "20px" }} />}
                </button>
            </div>
            <div className="error-msg">{alertForm}</div>
        </form>
    );
}