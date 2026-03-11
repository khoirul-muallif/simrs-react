import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'

import Home from './pages/Beranda'
import Dokter from './pages/Dokter'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Contact from './pages/Contact'
import Profil from './pages/Profil'
import VisiMisi from './pages/VisiMisi'
import Ambulan from './pages/Ambulan'
import RawatInap from './pages/pelayanan/RawatInap'
import PaketKesehatan from './pages/pelayanan/PaketKesehatan'
import HomeCareIndex from './pages/homecare/HomeCareIndex'
import HomeCareKonfirmasi from './pages/homecare/HomeCareKonfirmasi'
import HomeCareLacak from './pages/homecare/HomeCareLacak'

import PilihPasien from './pages/pendaftaran/PilihPasien'
import FormPendaftaran from './pages/pendaftaran/FormPendaftaran'
import Konfirmasi from './pages/pendaftaran/Konfirmasi'

import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/visi-misi" element={<VisiMisi />} />
        <Route path="/ambulan" element={<Ambulan />} />
        <Route path="/dokter" element={<Dokter />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/pendaftaran" element={<PilihPasien />} />
        <Route path="/pendaftaran/form" element={<FormPendaftaran />} />
        <Route path="/pendaftaran/konfirmasi" element={<Konfirmasi />} />
        <Route path="/pelayanan/rawat-inap" element={<RawatInap />} />
        <Route path="/pelayanan/paket-kesehatan" element={<PaketKesehatan />} />
        <Route path="/pelayanan/home-care" element={<HomeCareIndex />} />
<Route path="/pelayanan/home-care/konfirmasi/:token" element={<HomeCareKonfirmasi />} />
<Route path="/pelayanan/home-care/lacak" element={<HomeCareLacak />} />
<Route path="/pelayanan/home-care/track/:token" element={<HomeCareKonfirmasi />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App