import React from "react";
import { useState, useEffect } from "react";
import { CommentList } from "./CommentList";

export const HiddenComment = ({
    hidden_message,
    allComments,
    nesting_level,
    id,
}) => {
    const [childComments, setChildComments] = useState([]);
    const [areChildrenHidden, setAreChildrenHidden] = useState(false);

    useEffect(() => {
        const getReplies = () => {
            setChildComments(allComments?.filter(comment => comment?.parent_id === id));
        }

        getReplies();
    }, []);

    return (
        <>
            <div className="comment">
                <div className="message">{hidden_message}</div>
            </div>
            {childComments?.length > 0 && (
                <>
                    <div
                        className={`nested-comments-stack ${areChildrenHidden ? "hide" : ""
                            }`}
                    >
                        <button
                            className="collapse-line"
                            aria-label="Hide Replies"
                            onClick={() => setAreChildrenHidden(true)}
                        />
                        <div className="nested-comments">
                            <CommentList comments={childComments} allComments={allComments} nesting_level={nesting_level + 1} />
                        </div>
                    </div>
                    <button
                        className={`btn mt-1 ${!areChildrenHidden ? "hide" : ""}`}
                        onClick={() => setAreChildrenHidden(false)}
                    >
                        Show Replies
                    </button>
                </>
            )}
        </>
    )
};