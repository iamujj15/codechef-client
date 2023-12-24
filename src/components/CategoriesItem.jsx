import Card from 'react-bootstrap/Card';

function CategoriesItem({ item }) {
  return (

    <Card style={{ width: '15rem', cursor: "pointer" }}>
      <Card.Img variant="top" src={item.img_url} style={{ height: "15rem", objectFit: "cover" }} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
      </Card.Body>
    </Card>

  );
}

export default CategoriesItem;