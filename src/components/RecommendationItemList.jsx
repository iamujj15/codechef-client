import React from "react";
import { useState, useEffect } from "react";
import Stack from "react-bootstrap/esm/Stack";
import RecommendationItem from "./RecommendationItem";

const RecommendationItemList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleBlogs = async () => {
        // Fetch Details of Blogs from Server
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}blogs/10`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            if (response.status >= 200 && response.status < 300) {
                setBlogs(responseData);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        handleBlogs();
    }, []);

    if (loading) {
        return (
            <div className="text-center">
                <div className="spinner-border me-4" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <Stack direction='vertical' className="p-2 ms-auto" style={{ width: "25%", border: "1px solid #d9d9d9", height: "fit-content" }}>
            <h4 style={{ fontSize: "25px", paddingBottom: "12px" }}>Recommended Articles</h4>
            {blogs.map((item) => (
                <RecommendationItem item={item} key={item.id} />
            ))}
        </Stack>
    );
};

export default RecommendationItemList;