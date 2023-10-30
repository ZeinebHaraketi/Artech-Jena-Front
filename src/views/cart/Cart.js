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

    const query1 = `
        PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        SELECT ?cart ?product
        WHERE {
          ?cart rdf:type artechh:Cart.
          ?cart artechh:HasProduct ?product.
          ?cart artechh:IntoCart ?product.
        }
    `;

    const query2 = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
        SELECT ?cart ?shipping
        WHERE {
          ?cart rdf:type artechh:Cart.
          ?cart artechh:IsRelatedTo ?shipping.
          ?shipping rdf:type artechh:Shipping.
        }
    `;

    axios
      .all([
        axios.get(endpoint, { params: { query: query, format: 'json' }, headers: { Accept: 'application/sparql-results+json' } }),
        axios.get(endpoint, { params: { query: query1, format: 'json' }, headers: { Accept: 'application/sparql-results+json' } }),
        axios.get(endpoint, { params: { query: query2, format: 'json' }, headers: { Accept: 'application/sparql-results+json' } }),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          const cartData = res1.data.results.bindings;
          const productsData = res2.data.results.bindings;
          const shippingData = res3.data.results.bindings;

          const combinedData = cartData.map((cart) => {
            const cartId = cart.cart.value.split('#')[1];
            const products = productsData
              .filter((product) => product.cart.value === cart.cart.value)
              .map((product) => product.product.value.split('#')[1]);
            const shipping = shippingData
              .filter((ship) => ship.cart.value === cart.cart.value)
              .map((ship) => ship.shipping.value.split('#')[1]);

            return {
              cartId,
              cartName: cartId,
              products,
              shipping,
            };
          });

          setCarts(combinedData);
        })
      )
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="table-container">
        <Table className="type-table" responsive>
          <thead className="table-header">
            <tr>
              <th>Id</th>
              <th>carts Name</th>
              <th>products</th>
              <th>shipping</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((cart, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{cart.cartName}</td>
                <td>{cart.products.join(', ')}</td>
                <td>{cart.shipping.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Cart;
