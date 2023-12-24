import React from 'react'
import Stack from 'react-bootstrap/Stack';
import BlogItem from './BlogItem';
import RecommendationItemList from './RecommendationItemList';

const Blog = () => {
    return (
        <div >
            <Stack direction="horizontal" gap={4} style={{ margin: "3rem 10rem", alignItems: "flex-start" }}>
                <div className="p-2" style={{ width: "75%", border: "1px solid transparent" }}>
                    <BlogItem />
                </div>
                <RecommendationItemList />
            </Stack>
        </div>
    )
}

export default Blog