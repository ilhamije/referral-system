import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

function Dashboard() {
    // const [data, setData] = useState({ hits: [] });
    const [data, setData] = useState([]);
    // const [data, setData] = useState();

    useEffect(() => {
        async function fetchData() {
            const result = await fetch('http://localhost:8000/ref/uniqlink/');
            const jsonData = await result.json()
            console.log(jsonData);
            setData(jsonData)
        }
        fetchData();
    }, [])

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
                    {
                        data.map(item => (
                            <tr>
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