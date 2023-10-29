import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';

function Payment() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const endpoint = 'http://localhost:3030/Artech/sparql';
        const query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
            SELECT ?payment
            WHERE {
                ?payment rdf:type artechh:Payment .
            }
        `;

        axios.get(endpoint, {
            params: { query, format: 'json' },
            headers: { Accept: 'application/sparql-results+json' }
        })
        .then(res => {
            const results = res.data.results.bindings;
            const paymentNames = results.map(item => {
                // Extract only the last part of the URL to get the Payment name
                return item.payment.value.split("#")[1];
            });
            setPayments(paymentNames);
        })
        .catch(err => console.error(err));
    }, []);

    return (
       <>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <div className="table-container">

       <Table className="type-table" responsive>
       <thead className="table-header">
                <tr>
                    <th>Id</th>
                    <th>Payment Name</th>
                </tr>
            </thead>
            <tbody>
                {payments.map((paymentName, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{paymentName}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
       </>
    );
}

export default Payment;
