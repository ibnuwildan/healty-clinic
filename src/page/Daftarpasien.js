import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form} from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
const DaftarPasien = () => {

    const [pasienPribadi, setPasienPribadi] = useState([]);
    const [pasienBpjs, setPasienBpjs] = useState([]);
    const [gejalasakit, setGejalasakit] = useState("")
    const [selectedPasienId, setSelectedPasienId] = useState(null);
    const [selectedPasienData, setSelectedPasienData] = useState(null);

    // Modal
    const [show, setShow] = useState(false);

    const navigate = useNavigate()


    useEffect (() => {
        axios.get("http://localhost:8080/daftar-pribadi")
        .then( res => setPasienPribadi(res.data))
        .catch( err => console.log(err))

        axios.get("http://localhost:8080/pendaftaran-bpjs")
        .then( res => setPasienBpjs(res.data))
        .catch( err => console.log(err))
    }, [])

    const handleDaftarPasien = (id) => {
      setSelectedPasienId(id);
      setShow(true);
      // Mengambil data pasien berdasarkan ID yang dipilih
      axios.get(`http://localhost:8080/pasien/${id}`)
      .then(res => {
          setSelectedPasienData(res.data);
      })
      .catch(err => console.log(err));
  }

  const handleClose = () => {
    setShow(false);
    setSelectedPasienId(null);
    setSelectedPasienData(null); // Reset data pasien terpilih saat modal ditutup
}

  
const handleSubmitBerobat = () => {
  axios.post(`http://localhost:8080/daftar-pasien`, {
      // Menggunakan data dari selectedPasienData dan gejala sakit yang dimasukkan pengguna
      ...selectedPasienData,
      gejalasakit: gejalasakit
  })
  .then(res => {
      console.log(res);
      alert("Pasien sudah terdaftar");
      navigate("/");
  })
  .catch(error => {
      console.error('Error submitting data:', error);
  });
}

    return (
        <div className="daftar-pasien mx-5 py-5">     
        {/* <Container> */}
        <h3 className="text-center">Daftar Pasien Klinik Sehat </h3>
            <div className="row">
                <div className="col-md-6 px-5">
                    <h4 className="text-center py-4">Antrian Pasien Daftar Pribadi</h4>
                    <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>No Antrian </th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                      {pasienPribadi.map((data, i) => (
                        <tr key={i}>
                        <td>{data.no_antrian}</td>
                        <td><Button><Link to={`/detail-daftar-pasien/${data.id}`} style={{textDecoration: 'none', color: "white" }}>Daftar Berobat</Link></Button></td>
                        </tr>
                      ))}
                    </tbody>
                    </Table>
                </div>
                <div className="col-md-6 px-5">
                <h4 className="text-center py-4">Antrian Pasien Daftar BPJS</h4>
                    <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>No Antrian</th>
                        <th>Nama</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                      {pasienBpjs && pasienBpjs.map((data, i) => (
                        <tr key={i}>
                        <td>{data.no_antrian}</td>
                        <td>{data.nama}</td>
                        {/* <td>{data.nobpjs}</td> */}
                        <td><Button onClick={() => handleDaftarPasien(data.id)}>Daftar berobat</Button></td>
                        </tr>
                      ))}
                    </tbody>
                    </Table>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Gejala Pasien</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Gejala sakit Pasien </Form.Label>
              <Form.Control as="textarea" 
              rows={3} 
              placeholder='infomasikan tensi, suhu tubuh dan gejala pasien' 
              value={gejalasakit}
              onChange={(e) => setGejalasakit(e.target.value)}
             />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmitBerobat}>
            Daftarkan
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default DaftarPasien