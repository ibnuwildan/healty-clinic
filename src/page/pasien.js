import axios from "axios";
import React, { useEffect, useState } from "react";
import {Container, Table} from 'react-bootstrap';
import { Link } from "react-router-dom";

const PasienBerobatPage = () => {
    const [daftarPasien, setDaftarPasien] = useState([])

    useEffect (() => {
        axios.get("http://localhost:8080/daftar-pasien")
        .then(res => setDaftarPasien(res.data))
        .catch(err => console.log(err))
    })

    return( 
        <div className="py-5 bg-light">
            <h4 className="text-center pb-3">Daftar Pasien</h4>
            <div className="bg-white mx-5 py-3">
                <Container>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Name Pasien</th>
                    <th>Gejala Pasien</th>
                    </tr>
                </thead>
                <tbody>
                    {daftarPasien && daftarPasien.map((data, i) => (
                    <tr>
                    <td><Link to={`/detail-pasien-berobat/${data.id}`} style={{textDecoration: 'none', color: "black" }}>{data.nama} </Link></td>
                    <td><Link to={`/detail-pasien-berobat/${data.id}`} style={{textDecoration: 'none', color: "black" }}>{data.gejalasakit} </Link></td>
                    </tr>
                    ))}
                </tbody>
                </Table>
                </Container>
            </div>
        </div>
    )
}

export default PasienBerobatPage