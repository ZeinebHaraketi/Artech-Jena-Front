import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import './Cart.css';

function Cart() {
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        const endpoint = 'http://localhost:3030/Artech/sparql';
        const query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
            SELECT ?cart
            WHERE {
                ?cart rdf:type artechh:Cart .
            }
        `;

        axios.get(endpoint, {
            params: { query, format: 'json' },
            headers: { Accept: 'application/sparql-results+json' }
        })
        .then(res => {
            const results = res.data.results.bindings;
            const cartNames = results.map(item => {
                return item.cart.value.split("#")[1]; // Assumption: cart value is the last part after "#"
            });
            setCarts(cartNames);
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

        <div className="table-container">
            <Table className="type-table" responsive>
                <thead className="table-header">
                    <tr>
                        <th>Id</th>
                        <th>Cart Name</th>
                    </tr>
                </thead>
                <tbody>
                    {carts.map((cartName, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{cartName}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
       </>
    );
}

export default Cart;
