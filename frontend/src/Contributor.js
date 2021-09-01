import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import validator from 'validator'

import "./Login.css";

async function ContributorEmail(credentials) {
    let { uniqid } = useParams();
    console.log('uniqid param is: ', { uniqid });
    // return fetch('http://localhost:8000/auth/token/obtain/', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(credentials)
    // })
    //     .then(data => data.json())
    console.log('credentials passed : ', credentials);
}

export default function Contributor() {
    const [email, setEmail] = useState('');
    const [validForm, setValidForm] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        const contEmail = await ContributorEmail({
            email
        });
        console.log('submitted email: ', contEmail);
    }

    function validateForm() {
        if (validator.isEmail(email)) {
            return true
        } else {
            return false
        }
    }

    if (validForm === true) {
        return (
            <div className="Login">
                <b>Thank You for Your Contribution</b>
                <small>Have a nice day.</small>
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
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Submit
                </Button>
            </Form>
        </div>

    );
}
