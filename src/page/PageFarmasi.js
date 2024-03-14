import {useState, useEffect} from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const FarmasiPage = () => {
    const [daftarpasien, setDaftarpasien] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/daftar-pasien")
        .then(res => setDaftarpasien(res.data))
        .catch(err => console.log(err))
    })

    return(
        <div>
            <h4 className="text-center">Farmacy</h4>
            <Table className='mx-auto' striped style={{width: "70%"}}>
            <thead>
                    <tr>
                    <th>Name Pasien</th>
                    <th></th>
                    </tr>
                </thead>
            <tbody>
                {daftarpasien && daftarpasien.map((data, i) => (
                    <tr>
                         <td><Link to={`/detail-farmasi-pasien/${data.id}`} style={{textDecoration: 'none', color: "black" }}>{data.nama} </Link></td>
                        <td></td>
                    </tr>        
    
                ))}
            </tbody>
        </Table>
        </div>
    )
}

export default FarmasiPage