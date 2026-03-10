import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'

import Home from './pages/Beranda'
import Dokter from './pages/Dokter'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Contact from './pages/Contact'

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
        <Route path="/dokter" element={<Dokter />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/pendaftaran" element={<PilihPasien />} />
        <Route path="/pendaftaran/form" element={<FormPendaftaran />} />
        <Route path="/pendaftaran/konfirmasi" element={<Konfirmasi />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App