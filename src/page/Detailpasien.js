import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


const DetailPasienPage = () => {
    const { id } = useParams(); // Mendapatkan ID pasien dari URL
    const [pasien, setPasien] = useState(null);// State untuk menyimpan data pasien
    const [gejalasakit, setGejalasakit] = useState("")
    const [eidpasien, setEditpasien] = useState(false)
  

    const navigate = useNavigate()
// Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
  
  

    useEffect(() => {
        // Panggilan HTTP untuk mengambil data pasien berdasarkan ID
        axios.get(`http://localhost:8080/pasien/${id}`)
            .then(response => {
                setPasien(response.data); // Mengupdate state dengan data pasien yang diterima dari server
            })
            .catch(error => {
                console.error('Error fetching pasien data:', error);
            });
    }, [id]);

    if (!pasien) {
        return <div>Loading...</div>; // Menampilkan loading jika data pasien masih diambil dari server
    }

    const handleSubmitBerobat = () => {
        axios.post(`http://localhost:8080/daftar-pasien`, {
            nama: pasien.nama,
            nobpjs: pasien.nobpjs,
            nik: pasien.nik,
            tempatlahir: pasien.tempatlahir,
            tgllahir: pasien.tgllahir,
            alamat: pasien.alamat,
            jeniskelamin: pasien.jeniskelamin,
            nohp: pasien.nohp,
            email: pasien.email,
            kategori: pasien.kategori,
            informasi: pasien.informasi,
            namawali: pasien.namawali,
            status: pasien.status,
            nohpwali: pasien.nohpwali,
            gejalasakit: gejalasakit
        })
        .then(res => {
            console.log(res)
            alert("pasien sudah terdaftar")
            navigate("/");
        })
        .catch(error => {
            console.error('Error submitting data:', error);
        });
    };
    
    const handleSaveEdit = () => {
      axios.put(`http://localhost:8080/pasien/${id}`, pasien)
          .then(res => {
              console.log(res);
              alert("Data pasien berhasil diubah");
              setEditpasien(false); // Keluar dari mode edit
          })
          .catch(error => {
              console.error('Error editing pasien data:', error);
          });
  };

  const handleDelete = async (id) => {
    alert("delete ?")
    try {
        await axios.delete(`http://localhost:8080/pasien/${id}`)
        alert("suksesss")
        navigate("/")
    }catch(err){
        console.log(err)
    }
  }

    return(
    <div className='detail-pasien d-flex vh-100 justify-content-center align-items-center bg-light'>
        <div className="bg-white rounded p-3 " style={{width: "80%"}}>
        <h2 className='text-center pb-3'>Detail Pasien</h2>
        <div className='d-flex text-center mt-3'>

         {!eidpasien && (
           <Button variant='primary' onClick={() => setEditpasien(!eidpasien)}><MdEdit /></Button>
           )}
          <Button className='ms-2' variant='danger' onClick={e => handleDelete(id)}><MdDelete /></Button>
          </div>
          {eidpasien ? (
             <Form>
             <Table className='mx-auto' striped style={{width: "70%"}}>
                 <tbody>
                     <tr>
                         <th style={{width: "500px"}}>No Jamsostech</th>
                         <td><Form.Control type="text" value={pasien.nobpjs} onChange={(e) => setPasien({...pasien, nobpjs: e.target.value})} /></td>
                     </tr>
                     <tr>
                         <th style={{width: "500px"}}>Nama</th>
                         <td><Form.Control type="text" value={pasien.nama} onChange={(e) => setPasien({...pasien, nama: e.target.value})} /></td>
                     </tr>
                     <tr>
                         <th style={{width: "500px"}}>Jenis Kelamin</th>
                         <td><Form.Select type="text" value={pasien.jeniskelamin} onChange={(e) => setPasien({...pasien, jeniskelamin: e.target.value})} >
                            <option></option>   
                            <option value="pria">Pria</option>
                            <option value="wanita">wanita </option>
                            </Form.Select>
                         </td>
                     </tr>
                     <tr>
                         <th style={{width: "500px"}}>Tempat Lahir</th>
                         <td><Form.Control type="text" value={pasien.tempatlahir} onChange={(e) => setPasien({...pasien, tempatlahir: e.target.value})} /></td>
                     </tr>
                     <tr>
                         <th style={{width: "500px"}}>Tanggal Lahir</th>
                         <td><Form.Control type="date" value={pasien.tgllahir} onChange={(e) => setPasien({...pasien, tgllahir: e.target.value})} /></td>
                     </tr>
                     <tr>
                         <th style={{width: "500px"}}>Alamat</th>
                         <td><Form.Control type="text" value={pasien.alamat} onChange={(e) => setPasien({...pasien, alamat: e.target.value})} /></td>
                     </tr>
                     <tr>
                         <th style={{width: "500px"}}>No HP</th>
                         <td><Form.Control type="number" value={pasien.nohp} onChange={(e) => setPasien({...pasien, nohp: e.target.value})} /></td>
                     </tr>
                     <tr>
                         <th style={{width: "500px"}}>Email</th>
                         <td><Form.Control type="email" value={pasien.email} onChange={(e) => setPasien({...pasien, email: e.target.value})} /></td>
                     </tr>
                     <tr>
                         <th style={{width: "500px"}}>Kategori</th>
                         <td><Form.Select type="text" value={pasien.jeniskelamin} onChange={(e) => setPasien({...pasien, kategori: e.target.value})} >
                            <option></option>   
                            <option value="bpjs">BPJS</option>
                            </Form.Select>
                         </td>
                     </tr>
                     <tr>
                         <th style={{width: "500px"}}>Informasi Medis</th>
                         <td><Form.Control type="text" value={pasien.informasi} onChange={(e) => setPasien({...pasien, informasi: e.target.value})} /></td>
                     </tr>
                     <tr>
                         <th style={{width: "500px"}}>Nama Orang Tua/Wali</th>
                         <td><Form.Control type="text" value={pasien.namawali} onChange={(e) => setPasien({...pasien, namawali: e.target.value})} /></td>
                     </tr>
                     <tr>
                         <th style={{width: "500px"}}>Status Kedekatan</th>
                         <td><Form.Control type="text" value={pasien.status} onChange={(e) => setPasien({...pasien, status: e.target.value})} /></td>
                     </tr>
                     <tr>
                         <th style={{width: "500px"}}>No HP Wali</th>
                         <td><Form.Control type="number" value={pasien.nohpwali} onChange={(e) => setPasien({...pasien, nohpwali: e.target.value})} /></td>
                     </tr>
                     {/* Tambahkan baris-baris lain untuk data pasien yang lain */}
                 </tbody>
             </Table>
             <div className='text-center'>
            <Button variant='success mx-1' onClick={handleSaveEdit}>Save</Button>
            <Button variant='primary mx-1' onClick={() => setEditpasien(!eidpasien)}>
                       Cancel
              </Button>
             </div>
         </Form>
          ) : (
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
                {/* Tambahkan baris-baris lain untuk data pasien yang lain */}
            </tbody>
        </Table>
          )}
            
                {!eidpasien && (
                    <div className='text-center mt-3'>
                        <Button variant='success' size='lg' onClick={() => setShow(true)}>Daftar Berobat</Button>
                    </div>
                )}

          {/* Modal Dafar berobat */}
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
              onChange={(e) => setGejalasakit(e.target.value)}/>
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

export default DetailPasienPage;