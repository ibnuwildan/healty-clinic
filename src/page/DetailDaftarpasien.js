import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

const DetailDaftarPasien = () => {
    const {id} = useParams()
    const [pasien, setPasien] = useState(null)
    const [nama, setNama] = useState("")
    const [alamat, setAlamat] = useState("")
    const [nohp, setNohp] = useState("")
    const [kategori, setKategori] = useState("")
    const [informasi, setInformasi] = useState("")
    const [gejalasakit, setGejalasakit] = useState("")
    const navigate = useNavigate()


    useEffect(() => {
        axios.get(`http://localhost:8080/detail-pasien-pribadi/${id}`)
        .then(response => {
            setPasien(response.data)
        })
        .catch(error => {
            console.error('Error fetching pasien data:', error)
        })
    },[id]);

 
    const handleSubmitDaftar = async (e) => {  
      e.preventDefault();
      try { 
        axios.post(`http://localhost:8080/daftar-pribadi/${id}`, {
            nama: nama,
            alamat: alamat,
            nohp: nohp,
            kategori: kategori,
            informasi: informasi,
            gejalasakit: gejalasakit
        })
        alert("Sukses terdaftar");
        navigate("/daftar-pasien");
        await axios.delete(`http://localhost:8080/daftar-pribadi/${id}`);
        console.log("Data dihapus setelah berhasil terdaftar");
      } catch (error) {
        console.error('Error updating data:', error);
    }
    }
    
    return(
        <div>
            <p>pasien daftar</p>
            {pasien && (
            <p>{pasien.no_antrian}</p>
        )}
            <div>
            <Container>
            <Form onSubmit={handleSubmitDaftar}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="nama pasien"
                autoFocus
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                type="text"
                placeholder="alamat"
                autoFocus
                name="alamat"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
            </Form.Group>
        
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>No HP</Form.Label>
              <Form.Control
                type="number"
                placeholder="No HP"
                autoFocus
                value={nohp}
                onChange={(e) => setNohp(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ketegori Pendaftaran</Form.Label>
              <Form.Select 
              value={kategori}
                onChange={(e) => setKategori(e.target.value)} > 
                <option></option>   
                <option value="pribadi">Pribadi</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Informasi</Form.Label>
              <Form.Control
              type="text"
              autoFocus 
              placeholder="Informasi Medis/Riwayat Penyakit/Alergi"
              value={informasi}
              onChange={(e) => setInformasi(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Gejala sakit Pasien</Form.Label>
              <Form.Control
                as="textarea" 
                rows={3}  
               placeholder="infomasikan tensi, suhu tubuh dan gejala pasien"
               value={gejalasakit}
                onChange={(e) => setGejalasakit(e.target.value)}
              />
            </Form.Group>

          </Form>
          <Button variant="success" onClick={handleSubmitDaftar}>
            Daftarkan
          </Button>
          </Container>
            </div>
        </div>
    )
}

export default DetailDaftarPasien