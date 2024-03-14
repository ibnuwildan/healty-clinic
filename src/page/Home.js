import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Form, Table } from 'react-bootstrap';
import { Link } from "react-router-dom";

const AdminPage = () => {

const [dataPasien, setDataPasien] = useState([])
const [searchTerm, setSearchTerm] = useState('');

useEffect (() => {
    axios.get("http://localhost:8080/pasien")
    .then(res => setDataPasien(res.data))
    .catch(err => console.log(err)) 
})

const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
};

const filteredDataPasien = dataPasien.filter(data => {
    return data.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
           data.nobpjs.toLowerCase().includes(searchTerm.toLowerCase());
});

    return (
        <div className="py-5">
        <Container>
        <h4 className="text-center pb-3">Daftar Pasien BPJS</h4>
        <div className="row py-3 px-4 mx-5">
            <div className="col-md-6">
                <Button href="/formpasien">Daftar Pasien Baru</Button>
            </div>
            <div className="col-md-6 d-flex justify-content-end">
        <Form style={{width: "250px"}}>
          <Form.Control
            type="text"
            placeholder="Pencarian data pasien"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form>
        </div>
        </div>
        <div className="d-flex justify-content-center py-2">
        <Table striped bordered hover style={{width: "70rem"}}>
        <thead>
            <tr>
            {/* <th>No</th> */}
            <th>Nama Pasien</th>
            <th>No BPJS</th>
            </tr>
        </thead>
        <tbody>
            {filteredDataPasien && filteredDataPasien.map((data, i) => (
            <tr key={i}>
            {/* <td>{data.id}</td> */}
            <td><Link to={`/detailpasien/${data.id}`} style={{textDecoration: 'none', color: "black" }}>{data.nama}</Link>
            </td>
            <td><Link to={`/detailpasien/${data.id}`} style={{textDecoration: 'none', color: "black" }}>{data.nobpjs}</Link></td>
            </tr>
            ))}
        </tbody>
        </Table>
        </div>
        </Container>
        </div>
    )
}

export default AdminPage