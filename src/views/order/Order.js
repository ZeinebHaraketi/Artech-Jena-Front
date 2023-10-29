import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import './Order.css';
function Order() {
    const [preOrders, setPreOrders] = useState([]);
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [eventOrders, setEventOrders] = useState([]);


    useEffect(() => {
        const endpoint = 'http://localhost:3030/Artech/sparql';
        const query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
            SELECT ?preOrder
            WHERE {
                ?preOrder rdf:type artechh:PreOrder .
            }
        `;

        axios.get(endpoint, {
            params: { query, format: 'json' },
            headers: { Accept: 'application/sparql-results+json' }
        })
        .then(res => {
            const results = res.data.results.bindings;
            const preOrderNames = results.map(item => {
                // Extract only the last part of the URL to get the PreOrder name
                return item.preOrder.value.split("#")[1];
            });
            setPreOrders(preOrderNames);
        })
        .catch(err => console.error(err));
    }, []);

    
    useEffect(() => {
        const endpoint = 'http://localhost:3030/Artech/sparql';
        const query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
            SELECT ?purchaseOrder
            WHERE {
                ?purchaseOrder rdf:type artechh:PurchaseOrder .
            }
        `;

        axios.get(endpoint, {
            params: { query, format: 'json' },
            headers: { Accept: 'application/sparql-results+json' }
        })
        .then(res => {
            const results = res.data.results.bindings;
            const purchaseOrderNames = results.map(item => {
                // Extract only the last part of the URL to get the PurchaseOrder name
                return item.purchaseOrder.value.split("#")[1];
            });
            setPurchaseOrders(purchaseOrderNames);
        })
        .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const endpoint = 'http://localhost:3030/Artech/sparql';
        const query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
            SELECT ?eventOrder
            WHERE {
                ?eventOrder rdf:type artechh:EventOrder .
            }
        `;

        axios.get(endpoint, {
            params: { query, format: 'json' },
            headers: { Accept: 'application/sparql-results+json' }
        })
        .then(res => {
            const results = res.data.results.bindings;
            const eventOrderNames = results.map(item => {
                // Extract only the last part of the URL to get the EventOrder name
                return item.eventOrder.value.split("#")[1];
            });
            setEventOrders(eventOrderNames);
        })
        .catch(err => console.error(err));
    }, []);

    return (
        <>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="table-container">
        <Table className="type-table" responsive>
        <thead className="table-header">
                <tr>
                    <th>Id</th>
                    <th>EventOrder Name</th>
                </tr>
            </thead>
            <tbody>
                {eventOrders.map((eventOrderName, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{eventOrderName}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
        <br></br>
        <br></br>
        <div className="table-container">
        <Table className="type-table" responsive>
        <thead className="table-header">
                <tr>
                    <th>Id</th>
                    <th>PurchaseOrder Name</th>
                </tr>
            </thead>
            <tbody>
                {purchaseOrders.map((purchaseOrderName, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{purchaseOrderName}</td>
                    </tr>
                ))}
            </tbody>
        </Table>

        </div>
        
        <br></br>
        <br></br>
        <div className="table-container">

        <Table className="type-table" responsive>
        <thead className="table-header">
                <tr>
                    <th>Id</th>
                    <th>PreOrder Name</th>
                </tr>
            </thead>
            <tbody>
                {preOrders.map((preOrderName, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{preOrderName}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
        </>
    );
}

export default Order;
