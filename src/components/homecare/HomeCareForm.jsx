import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import Swal from 'sweetalert2'
import { submitHomeCare } from '../../services/api'
import InputField from '../ui/InputField'

const HomeCareForm = ({ layanans }) => {
  const navigate = useNavigate()
  const { executeRecaptcha } = useGoogleReCaptcha()
  const formLoadTime = useRef(Math.floor(Date.now() / 1000))
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    nama: '', umur: '', jenis_kelamin: '', telepon: '',
    alamat: '', layanan_id: '', latitude: '', longitude: '',
    email_fake: '', // honeypot
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.email_fake) return

    const confirm = await Swal.fire({
      title: 'Konfirmasi Pendaftaran',
      text: 'Pastikan data sudah benar.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Kirim',
      cancelButtonText: 'Periksa Lagi',
      reverseButtons: true,
    })
    if (!confirm.isConfirmed) return

    setLoading(true)
    Swal.fire({ title: 'Mengirim...', allowOutsideClick: false, didOpen: () => Swal.showLoading() })

    try {
      let recaptchaToken = 'dev-bypass'
      try {
        if (executeRecaptcha) recaptchaToken = await executeRecaptcha('homecare')
      } catch { /* bypass */ }

      const payload = {
        ...form,
        recaptcha_token: recaptchaToken,
        form_timestamp: formLoadTime.current,
      }

      const res = await submitHomeCare(payload)
      Swal.close()
      navigate(`/pelayanan/home-care/konfirmasi/${res.data.kode_unik}`)

    } catch (err) {
      Swal.close()
      const errData = err.response?.data
      if (errData?.errors) setErrors(errData.errors)
      else Swal.fire({ icon: 'error', title: 'Gagal', text: errData?.message ?? 'Terjadi kesalahan.' })
    } finally {
      setLoading(false)
    }
  }

  // Kelompokkan layanan berdasarkan kategori
  const grouped = layanans.reduce((acc, l) => {
    const kat = l.kategori?.nama ?? 'Lainnya'
    if (!acc[kat]) acc[kat] = []
    acc[kat].push(l)
    return acc
  }, {})

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {/* Honeypot */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <input type="text" name="email_fake" value={form.email_fake} onChange={handleChange} tabIndex={-1} />
      </div>

      <div>
        <InputField label="Nama Lengkap *" name="nama" value={form.nama} onChange={handleChange} placeholder="Nama pasien" />
        {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama[0]}</p>}
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <InputField label="Umur *" name="umur" type="number" value={form.umur} onChange={handleChange} placeholder="Contoh: 45" />
          {errors.umur && <p className="text-red-500 text-xs mt-1">{errors.umur[0]}</p>}
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Jenis Kelamin *</label>
          <select name="jenis_kelamin" value={form.jenis_kelamin} onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            <option value="">-- Pilih --</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
          {errors.jenis_kelamin && <p className="text-red-500 text-xs mt-1">{errors.jenis_kelamin[0]}</p>}
        </div>
      </div>

      <div>
        <InputField label="No Telepon *" name="telepon" type="tel" value={form.telepon} onChange={handleChange} placeholder="081234567890" />
        {errors.telepon && <p className="text-red-500 text-xs mt-1">{errors.telepon[0]}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Alamat Lengkap *</label>
        <textarea name="alamat" value={form.alamat} onChange={handleChange}
          rows={3} placeholder="Jalan, RT/RW, Kelurahan, Kecamatan"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" required />
        {errors.alamat && <p className="text-red-500 text-xs mt-1">{errors.alamat[0]}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Layanan *</label>
        <select name="layanan_id" value={form.layanan_id} onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
          <option value="">-- Pilih Layanan --</option>
          {Object.entries(grouped).map(([kat, items]) => (
            <optgroup key={kat} label={kat}>
              {items.map(l => <option key={l.id} value={l.id}>{l.nama_layanan}</option>)}
            </optgroup>
          ))}
        </select>
        {errors.layanan_id && <p className="text-red-500 text-xs mt-1">{errors.layanan_id[0]}</p>}
      </div>

      <button type="submit" disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-lg transition">
        {loading ? 'Mengirim...' : 'Ajukan Permintaan →'}
      </button>
    </form>
  )
}

export default HomeCareForm