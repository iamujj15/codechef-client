import Stack from 'react-bootstrap/Stack';
import CategoriesItem from './CategoriesItem';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Featured() {
    const [featured, setFeatured] = useState([]);

    const handleFeaturedBlogs = async () => {
        // Fetch Basic Details of Blogs from Server
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}blogs/basic/5`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            if (response.status >= 200 && response.status < 300) {
                setFeatured(responseData);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        handleFeaturedBlogs();
    }, []);

    return (
        <div style={{ margin: "5rem 20rem" }}>
            <h2 style={{ marginBottom: "3rem" }}>Featured Blogs</h2>
            <Stack direction="horizontal" gap={3} style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}>
                {featured.map((item) => (
                    <Link to={`/blog/${item.id}`} key={item.id} style={{ textDecoration: "none" }}>
                        <CategoriesItem item={item} key={item.id} />
                    </Link>
                ))}
            </Stack>
            <Link to="/blogs" style={{ textDecoration: 'none' }}>
                <h4 style={{ fontSize: "20px", paddingBottom: "12px", marginTop: "30px", color: "royalblue" }}>
                    See All Blogs...
                </h4>
            </Link>
        </div >
    );
}

export default Featured;