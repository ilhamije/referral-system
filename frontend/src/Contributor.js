import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import validator from 'validator'

import "./Login.css";

async function ContributorEmail(payload) {
    // console.log('payload passed : ', payload);
    var url = 'http://localhost:8000/ref/code/' + payload['uniqid'];
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'contributor_email': payload['email']})
    })
    .then(data => data.json())
}

export default function Contributor() {
    const [email, setEmail] = useState('');
    const [validForm, setValidForm] = useState(false);
    const [message, setMessage] = useState('');
    let { uniqid } = useParams();

    const handleSubmit = async e => {
        e.preventDefault();
        const contEmail = await ContributorEmail({
            email, uniqid
        });
        console.log('submitted email: ', contEmail);
        if ('non_field_errors' in contEmail) {
            setValidForm(false);
            setMessage('Email is already used.')
        } else {
            setValidForm(true);
        }
    }

    function validateForm() {
        if (validator.isEmail(email)) {
            return true
        } else {
            return false
        }
    }

    if (validForm) {
        return (
            <div className="Login">
                <Form>
                    <small>Submit your email address to contribute.</small>
                    <h2>Contribution</h2>
                    <p>Thanks! Your email has been submitted.</p>
                </Form>
            </div>
        )
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <small>Submit your email address to contribute.</small>
                <h2>Contribution</h2>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                </Form.Group>
                <div>{message}</div>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Submit
                </Button>
            </Form>
        </div>

    );
}
