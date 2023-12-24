import React from "react";
import { FaReply, FaEdit, FaTrash } from "react-icons/fa";
import { BiUpvote, BiDownvote, BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { FaFlag } from "react-icons/fa6";
import { CommentForm } from "./CommentForm";
import { useState, useEffect } from "react";
import { IconBtn } from "./IconBtn";
import { CommentList } from "./CommentList";
import fetchAuth from "../auth";
import { useParams } from "react-router-dom";
import { DeletedComment } from "./DeletedComment";

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
})

export const Comment = ({
    id,
    comment_value,
    upvotes,
    downvotes,
    posted_by,
    reg_date,
    allComments,
    nesting_level,
    is_deleted,
    deleted_message,
    handleBlog
}) => {
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [areChildrenHidden, setAreChildrenHidden] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [currentUsername, setCurrentUsername] = useState("");
    const [childComments, setChildComments] = useState([]);
    const [upvotedByMe, setUpvotedByMe] = useState(false);
    const [downvotedByMe, setDownvotedByMe] = useState(false);
    const [alertForm, setAlertForm] = useState("");
    const [loading, setLoading] = useState(false);

    let blogId = useParams().blog_id;

    useEffect(() => {
        const handleAuth = async () => {
            const authDetails = await fetchAuth();
            if (authDetails.auth) {
                setIsAuth(true);
            }
            setCurrentUsername(authDetails.user_id);
        }

        handleAuth();
    }, []);

    useEffect(() => {
        const getReplies = () => {
            setChildComments(allComments?.filter(comment => comment?.parent_id === id));
        }

        getReplies();
    }, []);

    const onToggleCommentUpvote = async (e) => {
        e.preventDefault();
        if (isAuth) {
            const upvoteComment = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/blog/${blogId}/comment/${id}/upvote`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user_id: currentUsername
                        })
                    });
                    const responseData = await response.json();
                    if (responseData.upvote_toggled !== undefined)
                        setUpvotedByMe(responseData?.upvote_toggled);
                    if (responseData.downvote_toggled !== undefined)
                        setDownvotedByMe(responseData?.downvote_toggled);
                } catch (err) {
                    console.log(err);
                }
            }

            await upvoteComment();
        } else {
            alert("Please login to upvote");
        }
    }

    const onToggleCommentDownvote = (e) => {
        e.preventDefault();
        if (isAuth) {
            const downvoteComment = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/blog/${blogId}/comment/${id}/downvote`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user_id: currentUsername
                        })
                    });
                    const responseData = await response.json();
                    if (responseData.downvote_toggled !== undefined)
                        setDownvotedByMe(responseData?.downvote_toggled);
                    if (responseData.upvote_toggled !== undefined)
                        setUpvotedByMe(responseData?.upvote_toggled);
                } catch (err) {
                    console.log(err);
                }
            }

            downvoteComment();
        } else {
            alert("Please login to downvote");
        }
    }

    const onCommentReply = async (boxMessage) => {
        if (nesting_level >= 5) {
            setAlertForm("Cannot reply beyond 5 levels of nesting");
            return;
        }

        if (isAuth) {
            setLoading(true);
            const user_id = currentUsername;

            // Create a Comment
            const createComment = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/blog/${blogId}/comment`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            blog_id: blogId,
                            parent_id: id,
                            posted_by: user_id,
                            comment_value: boxMessage,
                            nesting_level: nesting_level + 1
                        })
                    });
                    const responseData = await response.json();
                    if (response.status >= 200 && response.status < 300) {
                        setLoading(false);
                    } else {
                        setLoading(false);
                    }
                    setAlertForm(responseData.message);
                } catch (err) {
                    setAlertForm("Something went wrong");
                    console.log(err);
                }
            }
            if (boxMessage.length === 0) {
                setAlertForm("Please enter a comment");
                setLoading(false);
                return;
            }

            await createComment();
            if (handleBlog !== undefined) {
                await handleBlog();
            }
        } else {
            setAlertForm("Please login to post a comment");
            return;
        }
    }

    useEffect(() => {
        if (alertForm.length > 0) {
            setTimeout(() => {
                setAlertForm("");
            }, 3000);
        }
    }, [alertForm]);

    const onCommentUpdate = async (boxMessage) => {
        if (isAuth) {
            if (currentUsername !== posted_by) {
                alert("You can not edit this comment!");
                return;
            }

            const updateComment = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/blog/${blogId}/comment/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            comment_value: boxMessage
                        })
                    });
                    await response.json();
                    if (response.status >= 200 && response.status < 300) {
                        setIsEditing(false);
                    }
                } catch (err) {
                    console.log(err);
                }
            }

            await updateComment();
        } else {
            alert("Please login to edit");
        }
    }

    const onCommentDelete = async () => {
        if (isAuth) {
            if (currentUsername !== posted_by) {
                alert("You can not delete this comment!");
                return;
            }

            const deleteComment = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/blog/${blogId}/comment/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user_id: currentUsername
                        })
                    });
                    await response.json();
                    if (response.status >= 200 && response.status < 300) {
                        // Delete the comment from the state
                    }
                } catch (err) {
                    console.log(err);
                }
            }

            await deleteComment();
        } else {
            alert("Please login to delete");
        }
    }

    const onCommentReport = async () => {
        if (isAuth) {
            const reportComment = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/blog/${blogId}/comment/${id}/report`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user_id: currentUsername
                        })
                    });
                    await response.json();
                    if (response.status >= 200 && response.status < 300) {
                        // Report the comment
                    }
                } catch (err) {
                    console.log(err);
                }
            }

            await reportComment();
        } else {
            alert("Please login to report");
        }
    }

    const toggleCommentUpvoteFn = { loading: false };
    const toggleCommentDownvoteFn = { loading: false };
    // const createCommentFn = { loading: false, error: null };
    // const updateCommentFn = { loading: false, error: null };
    const deleteCommentFn = { loading: false, error: null };

    if (is_deleted > 0) {
        return (
            <DeletedComment
                deleted_message={deleted_message}
                allComments={allComments}
                nesting_level={nesting_level}
                id={id}
            />
        )
    }

    return (
        <>
            <div className="comment">
                <div className="header">
                    <span className="name">{posted_by}</span>
                    <span className="date">
                        {reg_date && dateFormatter.format(new Date(reg_date))}
                    </span>
                </div>
                {isEditing ? (
                    <CommentForm
                        autoFocus
                        initValue={comment_value}
                        onSubmit={onCommentUpdate}
                        alertForm={alertForm}
                        loading={loading}
                    />
                ) : (
                    <div className="message">{comment_value}</div>
                )}
                <div className="footer">
                    <IconBtn
                        onClick={onToggleCommentUpvote}
                        disabled={toggleCommentUpvoteFn.loading}
                        Icon={upvotedByMe ? BiSolidUpvote : BiUpvote}
                        aria-label={upvotedByMe ? "UnUpvote" : "Upvote"}
                    >
                        {upvotes}
                    </IconBtn>
                    <IconBtn
                        onClick={onToggleCommentDownvote}
                        disabled={toggleCommentDownvoteFn.loading}
                        Icon={downvotedByMe ? BiSolidDownvote : BiDownvote}
                        aria-label={downvotedByMe ? "UnDownvote" : "Downvote"}
                    >
                        {downvotes}
                    </IconBtn>
                    {isAuth && (
                        <IconBtn
                            onClick={() => setIsReplying(prev => !prev)}
                            isActive={isReplying}
                            Icon={FaReply}
                            aria-label={isReplying ? "Cancel Reply" : "Reply"}
                        />
                    )}
                    {isAuth && posted_by === currentUsername && (
                        <>
                            <IconBtn
                                onClick={() => setIsEditing(prev => !prev)}
                                isActive={isEditing}
                                Icon={FaEdit}
                                aria-label={isEditing ? "Cancel Edit" : "Edit"}
                            />
                            <IconBtn
                                onClick={onCommentDelete}
                                Icon={FaTrash}
                                aria-label="Delete"
                                color="red"
                            />
                        </>
                    )}
                    <IconBtn
                        onClick={onCommentReport}
                        Icon={FaFlag}
                        aria-label="Report"
                    />
                </div>
                {deleteCommentFn.error && (
                    <div className="error-msg mt-1">{deleteCommentFn.error}</div>
                )}
            </div>
            {isReplying && (
                <div className="mt-1 ml-3">
                    <CommentForm
                        autoFocus
                        onSubmit={onCommentReply}
                        alertForm={alertForm}
                        loading={loading}
                        handleBlog={handleBlog}
                    />
                </div>
            )}
            {childComments?.length > 0 && (
                <>
                    <div
                        className={`nested-comments-stack ${areChildrenHidden ? "hide" : ""}`}
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
                        className={`btnRp btn mt-1 ${!areChildrenHidden ? "hide" : ""}`}
                        onClick={() => setAreChildrenHidden(false)}
                    >
                        Show Replies
                    </button>
                </>
            )
            }
        </>
    )
};