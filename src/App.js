// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './page/Dashboard';
import AdminPage from './page/Home';
import FormPAsienPage from './page/Formpasien';
import DetailPasienPage from './page/Detailpasien';
import PasienBerobatPage from './page/pasien';
import DaftarPasien from './page/Daftarpasien';
import DetailDaftarPasien from './page/DetailDaftarpasien';
import DetailPasienBerobat from './page/Detailpasienberobat';
import FarmasiPage from './page/PageFarmasi';
import FarmasiPasienDetail from './page/PegeFarmasiPasien';

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path='/' element={<AdminPage/>} />
          <Route path='/dashboard' element={<DashboardPage/>} />
          <Route path='/formpasien' element={<FormPAsienPage/>} />
          <Route path='/detailpasien/:id' element={<DetailPasienPage/>} />
          <Route path='/pasien' element={<PasienBerobatPage/>} />
          <Route path='/farmasi' element={<FarmasiPage/>} />
          <Route path='/daftar-pasien' element={<DaftarPasien/>} />
          <Route path='/detail-daftar-pasien/:id' element={<DetailDaftarPasien/>} />
          <Route path='/detail-pasien-berobat/:id' element={<DetailPasienBerobat/>} />
          <Route path='/detail-farmasi-pasien/:id' element={<FarmasiPasienDetail/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
