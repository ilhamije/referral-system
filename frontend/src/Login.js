import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./Login.css";
import "./Register";

async function loginUser(credentials) {
    return fetch('http://localhost:8000/auth/token/obtain/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({ setToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password
        });
        if('access_token' in token){
            console.log('ada access_token');
            setToken(token);
        } else {
            console.log('redirect to register page?');
        }
    }

    function validateForm() {
        return email.length > 0 && password.length > 7;
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
                <a href="/register">Register</a>
            </Form>
        </div>
    );
}
