import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from 'react';
import fetchAuth from '../auth';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

const LoginLogout = () => {
    const [username, setUsername] = useState("");
    const [auth, setAuth] = useState(false);
    const [clk, setClk] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    async function checkAuth() {
        const auth_param = await fetchAuth();
        setAuth(auth_param.auth);
        setUsername(auth_param.user_id);
        setIsLoading(false);
    }

    useLayoutEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if (Cookies.get("user_jwt_auth") === undefined) {
            setAuth(false);
        }
    }, []);

    let handleLogout = async (e) => {
        e.preventDefault();
        try {
            setClk(true);
            const cookieOptions = { expires: 1, path: "/", sameSite: "strict" };
            Cookies.remove("user_jwt_auth", cookieOptions);
        } catch (err) {
            console.log(err.message);
        }
    }

    if (isLoading) {
        return (
            <div className="text-center">
                <div className="spinner-border text-light me-4" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    return (
        <div>
            {clk && (
                <Navigate to="/login" replace={true} />
            )}
            {
                auth ? (<>
                    <Navbar expand="lg" className="">
                        <Container style={{ width: "12px", height: "12px" }}>
                            <Navbar.Brand>{username}</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavDropdown title="" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">
                                            <Link className='mx-auto' style={{ color: 'black', borderRadius: '6px', width: '70px', textAlign: 'center', textDecoration: 'none', paddingTop: '8px', paddingBottom: '8px', color: "#d9d9d9" }} type="submit" onClick={handleLogout}>Logout</Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </>
                ) : (
                    <Link className='mx-auto btn' style={{ borderRadius: '6px', width: '70px', textAlign: 'center', textDecoration: 'none', paddingTop: '8px', paddingBottom: '8px', color: "#d9d9d9", border: "none" }} type="submit" to="/login">Login</Link>)
            }
        </div>
    );
}

export default LoginLogout;