import React from "react";
import { Form, Button } from 'react-bootstrap';


export default function Newuniqlink() {
    var tokenData = JSON.parse(localStorage.getItem('token'));
    var userToken = 'JWT ' + tokenData.access
    // console.log(userToken);
    var opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': userToken,
        },
        mode: 'cors',
        credentials: 'same-origin',
        redirect: 'follow',
    };

    async function createAction() {
        let result = await fetch('http://localhost:8000/ref/uniqlink/', opt)
        let jsonData = await result.json();
        console.log(jsonData);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        console.log('Button clicked..');
        createAction();
        window.location.reload();
    }

    return (
        <div className="">
            <Form onSubmit={handleSubmit}>
                <Button block size="sm" type="submit">
                    New Unique Link
                </Button>
            </Form>
        </div>
    );
}
