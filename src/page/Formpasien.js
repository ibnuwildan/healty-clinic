import axios from "axios";
import Swal from 'sweetalert2'
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FormPAsienPage = () => {
    const [formData, setFormData] = useState({
        nama: "",
        nobpjs: "",
        nik: "",
        tempatlahir: "",
        tgllahir: "",
        alamat: "",
        jeniskelamin: "",
        nohp: "",
        email: "",
        kategori: "",
        informasi: "",
        namawali: "",
        status: "",
        nohpwali: "",
    });
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    function handleSubmit (event) {
        event.preventDefault();
        for (const key in formData) {
            if (formData[key] === "") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Mohon Mengisi data dengan lengkap!"
                  });
                  
                return; // Menghentikan pengiriman data jika ada field yang kosong
            }
        }
        axios.post("http://localhost:8080/form", formData)
        .then(res => { 
            console.log(res)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
            navigate("/")
            })
        .catch(err => console.log(err))
    }
    return(
        <div className="py-3 bg-light">
            <h4 className="text-center pb-3">Form Data Diri</h4>
            <Form onSubmit={handleSubmit}>
                <div className="row mx-5 p-5 bg-white" style={{borderRadius: "10px"}}>
                    <h4 className="">Data Diri</h4>
                <div className="col-md-4">
                <Form.Group className="mb-5 w-50" controlId="formBasicEmail">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" placeholder="Nama Lengkap" name="nama" value={formData.nama} onChange={handleChange}  />
                </Form.Group>

                <Form.Group className="mb-5 w-50" controlId="formBasicEmail">
                <Form.Label>Tempat Lahir</Form.Label>
                <Form.Control type="text" placeholder="Tempat Lahir" name="tempatlahir" value={formData.tempatlahir} onChange={handleChange} />
                </Form.Group>
                
                <Form.Group className="mb-5 w-50">
                <Form.Label>Jenis Kelamin</Form.Label>
                <Form.Select name="jeniskelamin" value={formData.jeniskelamin} onChange={handleChange}  >
                <option></option>   
                <option value="pria">Pria</option>
                <option value="wanita">wanita </option>
                </Form.Select>
                </Form.Group>

                <Form.Group className="mb-5" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Informasi Medis/Riwayat Penyakit/Alergi</Form.Label>
                <Form.Control as="textarea" rows={3}  name="informasi" value={formData.informasi} onChange={handleChange} />
                </Form.Group>

                </div>
                <div className="col-md-4">
                <Form.Group className="mb-5 w-50" controlId="formBasicEmail">
                <Form.Label>No BPJS</Form.Label>
                <Form.Control type="number" placeholder="No BPJS" name="nobpjs" value={formData.nobpjs} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-5 w-50" controlId="formBasicEmail">
                <Form.Label>Tanggal Lahir</Form.Label>
                <Form.Control type="date" placeholder="Tanggal Lahir"  name="tgllahir" value={formData.tgllahir} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-5 w-50" controlId="formBasicEmail">
                <Form.Label>No Hp</Form.Label>
                <Form.Control type="number" placeholder="No Handphone" name="nohp" value={formData.nohp} onChange={handleChange} />
                </Form.Group>

                </div>
                <div className="col-md-4">
                <Form.Group className="mb-5 w-50 " controlId="formBasicEmail">
                <Form.Label>NIK</Form.Label>
                <Form.Control type="number" placeholder="Nomor Induk Kependudukan" name="nik" value={formData.nik} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-5" controlId="formBasicEmail">
                <Form.Label>Alamat</Form.Label>
                <Form.Control type="text" placeholder="Alamat" name="alamat" value={formData.alamat} onChange={handleChange}  />
                </Form.Group>

                <Form.Group className="mb-5" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange}  />
                </Form.Group>

                <Form.Group className="mb-5 w-50">
                <Form.Label>kategori</Form.Label>
                <Form.Select name="kategori" value={formData.kategori} onChange={handleChange}  >
                <option></option>   
                <option value="bpjs">BPJS</option>
                </Form.Select>
                </Form.Group>
                </div>
                <h5>Data Tambahan</h5>
                <div className="col-md-4">
                <Form.Group className="mb-5 w-50" controlId="formBasicEmail">
                <Form.Label>Nama Orangtua/Wali</Form.Label>
                <Form.Control type="text" placeholder="Nama" name="namawali" value={formData.namawali} onChange={handleChange} />
                </Form.Group>
                </div>
                <div className="col-md-4">
                <Form.Group className="mb-5 w-50" controlId="formBasicEmail">
                <Form.Label>Ststus Kedekatan</Form.Label>
                <Form.Control type="text" placeholder="contoh: orang tua/kaka/sodara" name="status" value={formData.status} onChange={handleChange}/>
                </Form.Group>
                </div>
                <div className="col-md-4">
                <Form.Group className="mb-5 w-50" controlId="formBasicEmail">
                <Form.Label>No Hp</Form.Label>
                <Form.Control type="number" placeholder="No Handphone" name="nohpwali" value={formData.nohpwali} onChange={handleChange} />
                </Form.Group>
                </div>
                <div className="d-flex justify-content-end">
                <Button className="text-center" variant="success" type="submit">Tambahkan Data</Button>
                </div>
                </div>
            </Form>
        </div>
    )
}

export default FormPAsienPage   