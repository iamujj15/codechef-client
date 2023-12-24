import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import fetchAuth from '../auth';
import Image from 'react-bootstrap/Image';

const Login = () => {
    const [user_id, setUser_id] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            const auth_param = await fetchAuth();
            setAuth(auth_param.auth);
            setUser_id(auth_param.user_id);
        }

        checkAuth();
    }, []);

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: user_id,
                    password: password,
                }),
                credentials: "include"
            });
            const responseData = await response.json();
            if (response.status >= 200 && response.status < 300) {
                setUser_id("");
                setPassword("");
                const tkn = responseData.token;
                const username = responseData.username;
                const cookieValue = `${username};${tkn}`;
                const cookieOptions = { expires: 1, path: "/", sameSite: "strict" };
                if (Cookies.get("user_jwt_auth") !== undefined) {
                    Cookies.remove("user_jwt_auth", cookieOptions);
                }
                Cookies.set("user_jwt_auth", cookieValue, cookieOptions);
                setAuth(true);
            }
            setMessage(responseData.message);
        } catch (err) {
            setMessage(err.message);
        }
    }

    return (
        <div>
            <NavBar />
            <div style={{ margin: "0 11rem" }}>

                <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                        <Image src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?w=740&t=st=1702982814~exp=1702983414~hmac=e1d4ea33f7ca84bc0e026e65301d3a7c98a8a02108911ec1abd775ca98f54119" rounded style={{ width: "30rem", height: "30rem" }} />
                    </div>
                    <div style={{ width: "50%", backgroundColor: "transparent" }}>

                        {auth && (
                            <Navigate to="/" replace={true} />
                        )}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Col} className="mb-3" >
                                <Form.Label column sm="2" style={{}}>
                                    User ID
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type='text'
                                        placeholder='Username or Email'
                                        value={user_id}
                                        onChange={(e) => setUser_id(e.target.value)}
                                        style={{ border: "1px solid #808080" }}
                                        autoFocus
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                    Password
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ border: "1px solid #808080" }}
                                    />
                                </Col>
                            </Form.Group>
                            <div>
                                <button type="submit" style={{ border: "none", width: "84%", backgroundColor: "#1976d2", color: "#ffffff", marginTop: "15px", marginBottom: "15px", borderRadius: "5px", height: "30px" }}>Login</button>
                            </div>
                            <div style={{ display: "flex", gap: "6px" }}>
                                <p>Don't have an account?                           </p>
                                <Link to='/signup' style={{ textDecoration: "none" }}>
                                    Sign Up
                                </Link>

                            </div>
                            <div>
                                {message ? <p style={{ color: "white", fontSize: "15px", backgroundColor: "red", width: "85%", height: "35px", display: "flex", padding: "5px 0", justifyContent: "center", borderRadius: "5px" }}>{message}</p> : null}
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login