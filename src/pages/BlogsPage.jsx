import React from 'react'
import NavBar from '../components/NavBar'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

const BlogsPage = () => {
    const [basicBlogs, setBasicBlogs] = useState([]);

    const handleBasicBlogs = async () => {
        // Fetch Basic Details of Blogs from Server
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}blogs/basic/10`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            if (response.status >= 200 && response.status < 300) {
                setBasicBlogs(responseData);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        handleBasicBlogs();
    }, []);

    return (
        <>
            <NavBar />
            <div style={{ margin: "2rem 11rem" }}>
                <h2 style={{ marginBottom: "4rem" }}>All Blog Posts</h2>
                <div style={{
                    display: "flex", justifyContent: "space-between",
                    margintop: "2rem",
                    flexWrap: "wrap",
                    gap: "1.5rem"
                }}>
                    {basicBlogs.map((item) => (
                        <Link to={`/blog/${item.id}`} key={item.id} style={{ textDecoration: "none" }}>
                            <Card style={{ width: '18rem', cursor: "pointer", marginBottom: "5rem" }}>
                                <Card.Img variant="top" src={item.img_url} style={{ height: "15rem", width: "18rem", objectFit: "cover" }} />
                                <Card.Body>
                                    <Card.Title style={{ marginTop: "10px" }}>{item.title}</Card.Title>
                                    <Card.Text>
                                        {item.desc}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default BlogsPage