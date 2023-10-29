import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';

function Post() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const endpoint = 'http://localhost:3030/Artech/sparql';
        const query = `
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX owl: <http://www.w3.org/2002/07/owl#>
            PREFIX artechh: <http://www.semanticweb.org/zeine/ontologies/2023/9/artechh#>
            SELECT ?post
            WHERE {
                ?post rdf:type artechh:Posts .
            }
        `;

        axios.get(endpoint, {
            params: { query, format: 'json' },
            headers: { Accept: 'application/sparql-results+json' }
        })
        .then(res => {
            const results = res.data.results.bindings;
            const postNames = results.map(item => {
                // Extract only the last part of the URL to get the Post name
                return item.post.value.split("#")[1];
            });
            setPosts(postNames);
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
                    <th>Post Name</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((postName, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{postName}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
        </>
    );
}

export default Post;
