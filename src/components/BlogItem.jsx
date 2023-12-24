import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Error404 from './Error404';
import InputGroup from 'react-bootstrap/InputGroup';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';
import fetchAuth from '../auth';

const BlogItem = () => {
    const [blog, setBlog] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [comments, setComments] = useState([]);
    const [rootComments, setRootComments] = useState([]);
    const [alertForm, setAlertForm] = useState("");
    const [message, setMessage] = useState("");
    const blogId = useParams().blog_id;

    const handleBlog = async () => {
        // Fetch Details of a Blog from Server
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}blog/${blogId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            if (response.status >= 200 && response.status < 300) {
                setMessage("");
                setBlog(responseData);
                setComments(responseData.comments);
                setRootComments(responseData?.comments?.filter(comment => comment.parent_id === null));
                setLoading(false);
            } else {
                setError(true);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        handleBlog();
    }, [blogId]);

    const handleSubmitComment = async (boxMessage) => {
        const authDetails = await fetchAuth();

        if (!authDetails.auth) {
            setAlertForm("Please Login to Comment");
            return;
        }

        if (boxMessage.length === 0) {
            setAlertForm("Please Enter a Comment");
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}blog/${blogId}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    blog_id: blogId,
                    comment_value: boxMessage,
                    parent_id: null,
                    posted_by: authDetails.user_id,
                    nesting_level: 0,
                })
            });
            await response.json();
            if (response.status >= 200 && response.status < 300) {
                setAlertForm("");
                setMessage("");
            } else {
                setError(true);
            }
        } catch (err) {
            console.log(err);
        }

        await handleBlog();
    }

    if (loading) {
        return (
            <div className="text-center">
                <div className="spinner-border me-4" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <Error404 />
        );
    }

    return (
        <div>
            <div>
                <Image src={`${blog.img_url}`} fluid style={{ height: "30rem", width: "80rem", objectFit: "cover" }} />
            </div>
            <div>
                <h1 style={{ margin: "3rem 0rem" }}>{blog.title}</h1>
                <p style={{}}>
                    {blog.blog_value}
                </p>
                <br />
                <hr />
                <br />
            </div>
            <InputGroup size='lg' style={{ display: "flex", flexDirection: "column" }}>
                <InputGroup.Text id="inputGroup-sizing-lg" style={{ border: "none", paddingBottom: "2rem", backgroundColor: "transparent" }}>Leave a message</InputGroup.Text>
                <CommentForm
                    loading={loading}
                    alertForm={alertForm}
                    onSubmit={handleSubmitComment}
                    initValue={message}
                    autoFocus
                />

            </InputGroup>
            <br />
            {
                rootComments != null && rootComments.length > 0 ? (
                    <div style={{ border: "1px solid #e6e6e6", borderRadius: "15px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}>
                        <div className="mt-4 mb-4">
                            <CommentList comments={rootComments} allComments={comments} nesting_level={0} blogHandler={handleBlog} />
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <h5>No Comments</h5>
                    </div>
                )
            }
        </div>
    )
}

export default BlogItem;