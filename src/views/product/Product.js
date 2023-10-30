import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import './Product.css';

function Product() {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const endpoint = 'http://localhost:3030/Artech/sparql';
        const query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
            SELECT ?product ?productType ?review
            WHERE {
                ?product rdf:type artechh:Product.
                OPTIONAL {
                    ?product artechh:hasReviews ?review.
                }
                ?product artechh:HasProductType ?productType.
            }
        `;
    
        axios.get(endpoint, {
            params: { query, format: 'json' },
            headers: { Accept: 'application/sparql-results+json' }
        })
        .then(res => {
            const results = res.data.results.bindings;
            const productData = results.map(item => {
                const productName = item.product.value.split("#")[1];
                const productType = item.productType.value.split("#")[1];
                const review = item.review ? item.review.value.split("#")[1] : 'No review available';
                return {
                    productName,
                    productType,
                    review,
                };
            });
            setProductData(productData);
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
                            <th>Product Name</th>
                            <th>Product Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData.map((product, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{product.productName}</td>
                                <td>{product.productType}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <br></br>
            <br></br>
            <div className="table-container">
                <Table className="type-table">
                    <thead className="table-header">
                        <tr>
                            <th>Id</th>
                            <th>Product Name</th>
                            <th>Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData.map((product, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{product.productName}</td>
                                <td>{product.review}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Product;