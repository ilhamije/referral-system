import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Login from "./Login";


function Dashboard() {
    const [data, setData] = useState([]);
    const [redirectLogin, setRedirectLogin] = useState(false);

    useEffect(() => {
        var tokenData = JSON.parse(localStorage.getItem('token'));
        // console.log(tokenData.access);
        var userToken = 'JWT ' + tokenData.access
        var opt = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userToken,
            },
            mode: 'cors',
            credentials: 'same-origin',
            redirect: 'follow',
        };

        async function fetchData() {
            let result = await fetch('http://localhost:8000/ref/uniqlink/', opt)
            let jsonData = await result.json();
            setData(jsonData);
            // return jsonData;
        }
        let fdata = fetchData();

        if(!fdata) {
            setRedirectLogin(true);
        }

    }, [])

    if (redirectLogin)
        return <Login />

    return (
        <Container>
            <Row><h1>Dashboard</h1></Row>
            <Row>
                <Col>
                <Button>Create new link</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                <Table striped bordered hover size="md">
                <thead>
                    <tr>
                    <th>URL</th>
                    <th>Created</th>
                    <th>Expiry Status</th>
                    </tr>
                </thead>
                <tbody>
                    {   data.length > 0 &&
                        data.map(item => (
                            <tr key={item.uuid}>
                            <td>{item.url}</td>
                            <td>{item.created}</td>
                            {
                                (item.is_expired === true) ? <td>Expired</td> : <td>Available</td>
                            }
                            </tr>
                        ))
                    }
                </tbody>
                </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;