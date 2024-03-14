import axios from 'axios';
import React, { useState } from 'react';
import { Button, Container, Modal, ModalTitle, Image, Form } from 'react-bootstrap';
import Swal from 'sweetalert2'
// import { Button, Modal, Form } from 'react-bootstrap';
// import axios from 'axios';
// import Swal from 'sweetalert2'

const DashboardPage = () => {
  const [showModalPribadi, setShowModalPribadi] = useState(false);
  const [showModalBpjs, setShowModalBpjs] = useState(false);
  const [antrianPribadi, setAntrianPribadi] = useState(0);
  const [antrianBpjs, setAntrianBpjs] = useState(0);
  const [nobpjs, setNobpjs] = useState("");

  const handleShow = () => setShowModalBpjs(true);
  // const [antrianPribadi, setAntrianPribadi] = useState(0);
  // const [antrianBPJS, setAntrianBPJS] = useState(0);

  function handleDaftarPribadi () {
    // Generate nomor antrian secara berurutan
    const nextAntrian = antrianPribadi + 1;
    axios.post("http://localhost:8080/no-daftar-pribadi", {nomorAntrian: nextAntrian})
    .then(res => {
      console.log(res)
      alert("sukessss")
    setAntrianPribadi(nextAntrian);
    // Tampilkan modal setelah mendapatkan nomor antrian
    setShowModalPribadi(true);
  })
  .catch(err => {
    console.log(err)
    alert("Terjadi kesalahan saat menyimpan nomor antrian");
  })
}

const handleDaftarBpjs = (event) => {
  event.preventDefault();
  axios.post("http://localhost:8080/daftar-bpjs", {nobpjs})
  .then(res => {
    console.log(res.data)
    const nextAntrianBpjs = antrianBpjs + 1;
    if(res.data.message === "success" && res.data.data){  
      const pasien = res.data.data[0]
      Swal.fire({
        text: "Nama Pasien : " + pasien.nama, 
        title: "No Antrian " + nextAntrianBpjs
      });
      // alert("Pendaftaran berhasil. Pemilik BPJS: " + pasien.nama + "No " + nextAntrianBpjs);
      axios.post("http://localhost:8080/pendaftaran-bpjs", {
        pasien,
        nomorAntrian: nextAntrianBpjs
      })
      .then(res => {
        console.log("Data pasien berhasil disimpan di database baru:", res.data)
      })
      .catch(err => {
        console.error("Terjadi kesalahan saat menyimpan data pasien di database baru:", err)
      })
      setAntrianBpjs(nextAntrianBpjs)
      setShowModalBpjs(false);
    }
  })
  .catch (err => {
    console.log(err)
    alert("error ngabbbb")
  })
  
}

  return (
      <div className='bg-light vh-100 py-3'>
      <Image src={require("../img/logo.png")} fluid  style={{ maxWidth: "200px" }} className="mx-auto d-block py-5"/>
      <div className='d-flex justify-content-center py-5' >
        <Button className='mx-5 ' size='lg' style={{height: "10rem"}} onClick={() => handleDaftarPribadi()}>Pendaftaran Pasien Pribadi</Button>
        <Button className='mx-5' variant='success' size='lg' onClick={handleShow}>Pendaftaran Pasien BPJS</Button>
      </div>

      <Modal show={showModalPribadi} onHide={() => setShowModalPribadi(false)}>
          <Modal.Header closeButton>
            <ModalTitle>Nomor Antrian Anda</ModalTitle>
          </Modal.Header>
          <Modal.Body className='text-center'>
            <h4>NOMOR </h4>
            <h1> {antrianPribadi}</h1>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModalPribadi(false)}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>


        <Modal show={showModalBpjs} onHide={() => setShowModalBpjs(false)}>
          <Modal.Header closeButton>
            <ModalTitle>Pendafataran Pasien BPJS</ModalTitle>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleDaftarBpjs}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Masukan No BPJS</Form.Label>
              <Form.Control
                type="number"
                name='nobpjs'
                onChange={e => setNobpjs(e.target.value)}
                autoFocus
              />
            </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type='submit' onClick={handleDaftarBpjs}>
              Daftar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
  );
}
export default DashboardPage