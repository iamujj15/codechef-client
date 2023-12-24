import React from 'react'
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom'

const RecommendationItem = ({ item }) => {
  return (
    <Link to={`/blog/${item.id}`} key={item.id} style={{ textDecoration: "none" }}>
      <Card style={{ width: '94%', cursor: "pointer", margin: "0 10px 1rem", border: "1px solid #a6a6a6" }} >
        <Stack direction="horizontal" style={{ alignItems: "flex-start" }} >
          <Card.Img variant="top" src={item.img_url} style={{
            width: "5rem",
            height: "5rem",
            marginBottom: "0px",
            objectFit: "cover"
          }} />
          <Card.Body style={{ paddingTop: "5px" }}>
            <Card.Title style={{ alignSelf: "flex-start", fontSize: "14px", fontWeight: "500" }}> {item.title} </Card.Title>
            <Card.Text style={{ fontSize: "10px", width: "100%", color: "#000000" }}>
              {item.blog_value.substring(0, 100) + "..."}
            </Card.Text>
          </Card.Body>
        </Stack>
      </Card>
    </Link>
  )
}

export default RecommendationItem;