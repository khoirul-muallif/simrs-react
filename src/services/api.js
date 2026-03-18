// E:\laragon\www\simrs-react\src\services\api.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json', // ← WAJIB untuk trigger expectsJson()
  }
})

// Beranda
export const getBeranda = () => api.get('/beranda')

// Gallery
// Gallery
export const getGallery = (params = {}) =>
  api.get('/gallery', { params })
// Mitra
export const getMitra = () => api.get('/mitra')

// Kamar
export const getKamar = () => api.get('/kamar')
export const getKamarData = () => api.get('/kamar-data')

// Dokter
export const getDokter = (params = {}) => api.get('/dokter', { params })
export const getJadwalTersedia = () => api.get('/jadwal/tersedia')

// Indikator Mutu
export const getIndikatorMutu = () => api.get('/indikator-mutu')

// Blog
export const getBlogList = (params = {}) => api.get('/blog', { params })
export const getBlogBySlug = (slug) => api.get(`/blog/${slug}`)
export const getBlogCategories = () => api.get('/blog/categories')
export const getBlogByCategory = (slug) => api.get(`/blog/categories/${slug}`)

// Pages
export const getPageBySlug = (slug) => api.get(`/pages/${slug}`)

// Pelayanan
export const getRawatInap = (params = {}) => api.get('/pelayanan/rawat-inap', { params })
export const getPaketKesehatan = (params = {}) => api.get('/pelayanan/paket-kesehatan', { params })

// Home Care
export const submitHomeCare = (data) => api.post('/home-care', data)
export const getKonfirmasiHomeCare = (token) => api.get(`/home-care/konfirmasi/${token}`)
export const trackHomeCare = (token) => api.get(`/home-care/track/${token}`)
export const cariHomeCare = (data) => api.post('/home-care/lacak', data)

// Pasien
export const cariPasien = (data) => api.post('/pendaftaran/pasien/cari', data)
export const simpanPasien = (data) => api.post('/pendaftaran/pasien', data)

// Pendaftaran
export const getFormPendaftaran = (pasienId) => api.get(`/pendaftaran/buat/${pasienId}`)
export const simpanPendaftaran = (pasienId, data) => api.post(`/pendaftaran/buat/${pasienId}`, data)
export const getKonfirmasiPendaftaran = (id) => api.get(`/pendaftaran/${id}/konfirmasi`)
export const pilihDokter = (data) => api.post('/pendaftaran/pilih-dokter', data)

// Select2
export const getSelect2Pasien = (q) => api.get('/select2/pasien', { params: { q } })
export const getSelect2Poliklinik = (q) => api.get('/select2/poliklinik', { params: { q } })
export const getSelect2Dokter = (q) => api.get('/select2/dokter', { params: { q } })
export const getSelect2PaketKesehatan = (q) => api.get('/select2/paket-kesehatan', { params: { q } })
export const getSelect2LayananHomeCare = (q) => api.get('/select2/layanan-homecare', { params: { q } })

export default api