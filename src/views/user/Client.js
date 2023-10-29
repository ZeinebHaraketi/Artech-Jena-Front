import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import './User.css';

function Client() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const endpoint = 'http://localhost:3030/Artech/sparql';
        const query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
            SELECT ?client
            WHERE {
                ?client rdf:type artechh:Client .
            }
        `;

        axios.get(endpoint, {
            params: { query, format: 'json' },
            headers: { Accept: 'application/sparql-results+json' }
        })
        .then(res => {
            const results = res.data.results.bindings;
            const clientNames = results.map(item => {
                // Extrayez seulement la dernière partie de l'URL pour obtenir le nom du client
                return item.client.value.split("#")[1];
            });
            setClients(clientNames);
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
                    <th>Client Name</th>
                </tr>
            </thead>
            <tbody>
                {clients.map((clientName, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{clientName}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
        </>
    );
}

export default Client;
