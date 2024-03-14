import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Table } from "react-bootstrap";


const FarmasiPasienDetail = () => {
    const { id } = useParams(); // Mendapatkan ID pasien dari URL
    const [pasien, setPasien] = useState(null);// State untuk menyimpan data pasien

    
    useEffect (() => {
        axios.get(`http://localhost:8080/daftar-pasien/${id}`)
        .then(response => {
            setPasien(response.data); // Mengupdate state dengan data pasien yang diterima dari server
        })
        .catch(error => {
            console.error('Error fetching pasien data:', error);
        });

    }, [id]);

    if (!pasien) {
        return <div>Loading...</div>; // Render loading indicator if pasien is null
    }
    return(
        <div>
            <p>detail farmasi</p>
            <Table className='mx-auto' striped style={{width: "70%"}}>
            <tbody>
           
                    <tr>
                    <th>No BPJS</th>
                    <td>{pasien.nobpjs}</td>
                    </tr>
                    <tr>
                    <th>Nama</th>
                    <td>{pasien.nama}</td>
                    </tr>
                    <tr>
                    <th>Tempat Lahir</th>
                    <td>{pasien.tempatlahir}</td>
                    </tr>
                    <tr>
                    <th>Diaknosa</th>
                    <td>{pasien.diaknosa}</td>
                    </tr>
                    <tr>
                    <th>Resep Obat</th>
                    <td>{pasien.resepobat}</td>
                    </tr>
            </tbody>
        </Table>
        </div>
    )
}

export default FarmasiPasienDetail