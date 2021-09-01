import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./Register.css";
import Dashboard from "./Dashboard";
import useToken from './useToken';

async function registerUser(credentials) {
    return fetch('http://localhost:8000/auth/user/create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

export default function Register() {
    const { token, setToken } = useToken();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirectDashboard, setRedirectDashboard] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        const getToken = await registerUser({
            email,
            password
        });
        if ('access' in getToken) {
            setToken(getToken);
            setRedirectDashboard(true);
        }
    }

    function validateForm() {
        return email.length > 0 && password.length > 7;
    }

    if (redirectDashboard)
        return <Dashboard />

    return (
        <div className="Register">
            <Form onSubmit={handleSubmit}>
                <small>
                    Your email is not registered.
                    Please register.
                </small>
                <h2><u>Register</u></h2>
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
                    Register
                </Button>
            </Form>
        </div>
    );
}
