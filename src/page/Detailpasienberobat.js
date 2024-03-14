import React, { useEffect, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DetailPasienBerobat = () => {
    const { id } = useParams(); // Mendapatkan ID pasien dari URL
    const [pasien, setPasien] = useState(null);// State untuk menyimpan data pasien
    const [diaknosa, setDiagnosa] = useState("");
    const [resepobat, setResep] = useState("");
    const navigate = useNavigate()

    useEffect (() => {
        axios.get(`http://localhost:8080/daftar-pasien/${id}`)
        .then(response => {
            const { diaknosa, resepobat } = response.data;

            setPasien(response.data); // Mengupdate state dengan data pasien yang diterima dari server
            setDiagnosa(diaknosa);
            setResep(resepobat);
        })
        .catch(error => {
            console.error('Error fetching pasien data:', error);
        });

    }, [id]);

    if (!pasien) {
        return <p>Loading...</p>; // Anda dapat menampilkan indikator loading saat data sedang diambil
    }


    const handleDiagnosaChange = (e) => {
        setDiagnosa(e.target.value);
    };

    const handleResepChange = (e) => {
        setResep(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/daftar-pasien/${id}`, { diaknosa, resepobat });
            alert("data berhasil di tambahkan")
            navigate("/")
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return(
        <div>
            <h4 className="text-center">Detail pasien berobat</h4>
            <Table className='mx-auto' striped style={{width: "70%"}}>
            <tbody>
            <tr>
                    <th style={{width: "500px"}}>No Jamsostech</th>
                    <td>{pasien.nobpjs}</td>
                    </tr>
                    <tr>
                    <th>Nama</th>
                    <td>{pasien.nama}</td>
                    </tr>
                    <tr>
                    <th>Jenis Kelamin</th>
                    <td>{pasien.jeniskelamin}</td>
                    </tr>
                    <tr>
                    <th>Tempat Lahir</th>
                    <td>{pasien.tempatlahir}</td>
                    </tr>
                    <tr>
                    <th>Tanggal Lahir</th>
                    <td>{pasien.tgllahir}</td>
                    </tr>
                    <tr>
                    <th>Alamat </th>
                    <td>{pasien.alamat}</td>
                    </tr>
                    <tr>
                    <th>No HP </th>
                    <td>{pasien.nohp}</td>
                    </tr>
                    <tr>
                    <th>Email </th>
                    <td>{pasien.email}</td>
                    </tr>
                    <tr>
                    <th>Kategori </th>
                    <td>{pasien.kategori}</td>
                    </tr>
                    <tr>
                    <th>Informasi medis/riwayat penyakit/alergi </th>
                    <td>{pasien.informasi}</td>
                    </tr>
                    <tr>
                    <th>Nama Orang Tua/Wali </th>
                    <td>{pasien.namawali}</td>
                    </tr>
                    <tr>
                    <th>Status Kedekatan </th>
                    <td>{pasien.status}</td>
                    </tr>
                    <tr>
                    <th>No HP Wali </th>
                    <td>{pasien.nohpwali}</td>
                    </tr> 
            </tbody>
        </Table>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDiagnosa">
                <Form.Label>DIaknosa Sakit Pasien</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Diaknosa" 
                    name="diaknosa"
                    value={diaknosa} 
                    onChange={handleDiagnosaChange}
                />
            </Form.Group>
            <Form.Group controlId="formResep">
                <Form.Label>Resep Obat</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Resep obat" 
                    name="resepobat"
                    value={resepobat} 
                    onChange={handleResepChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Tambahkan Data
            </Button>
        </Form>
        </div>
    )
}

export default DetailPasienBerobat;
