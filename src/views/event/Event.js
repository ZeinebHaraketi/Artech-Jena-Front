import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import './Event.css';

function Event() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const endpoint = 'http://localhost:3030/Artech/sparql';
        const query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
            SELECT ?event
            WHERE {
                ?event rdf:type artechh:Event .
            }
        `;

        axios.get(endpoint, {
            params: { query, format: 'json' },
            headers: { Accept: 'application/sparql-results+json' }
        })
        .then(res => {
            const results = res.data.results.bindings;
            const eventNames = results.map(item => {
                // Extract only the last part of the URL to get the Event name
                return item.event.value.split("#")[1];
            });
            setEvents(eventNames);
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
                    <th>Event Name</th>
                </tr>
            </thead>
            <tbody>
                {events.map((eventName, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{eventName}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
       </>
    );
}

export default Event;
