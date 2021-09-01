import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import Login from "./Login";
import Newuniqlink from './Newuniqlink';


export default function Dashboard() {
    const [data, setData] = useState([]);
    const [redirectLogin, setRedirectLogin] = useState(false);

    useEffect(() => {
        var tokenData = JSON.parse(localStorage.getItem('token'));
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

    const logout = () => {
        localStorage.clear();
        setRedirectLogin(true);
    }

    if (redirectLogin) {
        return <Login />
    }

    return (
        <Container>
            <Row><u onClick={logout}>logout</u></Row>
            <Row><h1>Dashboard</h1></Row>

            <Row>
                <Col>
                <Newuniqlink />
                </Col>
            </Row>
            <Row>
                <Col>
                <Table striped bordered hover size="md">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>URL</th>
                    <th>Created</th>
                    <th>Contributors</th>
                    <th>Expiry Status</th>
                    </tr>
                </thead>
                <tbody>
                    {   data.length > 0 &&
                        data.map((item, index) => (
                            <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.url}</td>
                            <td>{item.created}</td>
                            <td>{item.num_contributors}</td>
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
