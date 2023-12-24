import React from 'react'
import NavBar from '../components/NavBar'
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
const AboutPade = () => {
  return (
    <>
      <NavBar />
      <div style={{ margin: "3rem 11rem" }}>
        <h2 style={{ margin: "4rem 1rem 2rem" }}>Hi this is About</h2>

        <Card style={{ width: '100%', border: "0.1px solid transparent" }}>
          <Stack direction="horizontal" gap={3} style={{ flexDirection: "row-reverse", alignItems: "flex-start" }}>
            <Card.Img variant="top" src="https://i.pinimg.com/originals/7f/8f/72/7f8f722e49682c8c79a3a8b9f107f88a.jpg" style={{ height: "25rem", width: "20rem" }} />
            <Card.Body>
              <Card.Text style={{ fontSize: "18px" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                <br /> <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Card.Text>
            </Card.Body>
          </Stack>
        </Card>
      </div >
    </>
  )
}

export default AboutPade