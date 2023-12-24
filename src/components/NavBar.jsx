import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginLogout from './LoginLogout';

const NavBar = () => {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" expand="lg" sticky="top" direction="horizontal" gap={6}>
                <Container>
                    <Navbar.Brand href="/">CCBlogs</Navbar.Brand>
                    <Nav className="me-auto ms-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/blogs">Blogs</Nav.Link>
                    </Nav>
                    <Nav>
                        <span>
                            <LoginLogout />
                        </span>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;












