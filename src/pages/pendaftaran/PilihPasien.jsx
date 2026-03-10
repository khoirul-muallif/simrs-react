import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import usePendaftaran from '../../hooks/usePendaftaran'
import InputField from '../../components/ui/InputField' 
import { cariPasien, simpanPasien } from '../../services/api'

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY
const MIN_FORM_TIME = 0
const MAX_FORM_TIME = 7200

// ============================================
// INNER COMPONENT (perlu useGoogleReCaptcha di dalam Provider)
// ============================================
const PilihPasienInner = () => {
  const navigate = useNavigate()
  const { setDataPasien } = usePendaftaran()
  const { executeRecaptcha } = useGoogleReCaptcha()
  const formLoadTime = useRef(Math.floor(Date.now() / 1000))

  const [tab, setTab] = useState('baru')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const [formBaru, setFormBaru] = useState({
    nik: '', nama: '', alamat: '', jenis_kelamin: '',
    no_telepon: '', tanggal_lahir: '', tipe_pasien: '',
    no_bpjs: '', no_rekam_medik: '',
    company_website: '', // honeypot
  })

  const [formLama, setFormLama] = useState({
    nik: '', no_rekam_medik: '',
    company_website: '', // honeypot
  })

  // Reset errors saat ganti tab
  useEffect(() => {
    setErrors({})
    formLoadTime.current = Math.floor(Date.now() / 1000)
  }, [tab])

  const checkTiming = () => {
    const elapsed = Math.floor(Date.now() / 1000) - formLoadTime.current
    if (elapsed < MIN_FORM_TIME) return 'fast'
    if (elapsed > MAX_FORM_TIME) return 'timeout'
    return 'ok'
  }

  const handleChangeBaru = (e) => {
    const { name, value } = e.target
    setFormBaru(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: null }))
  }

  const handleChangeLama = (e) => {
    const { name, value } = e.target
    setFormLama(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: null }))
  }

  // ============================================
  // SUBMIT PASIEN BARU
  // ============================================
  const handleSubmitBaru = async (e) => {
    e.preventDefault()
    if (formBaru.company_website) return

    const timing = checkTiming()
    if (timing === 'fast') {
      Swal.fire({ icon: 'warning', title: 'Terlalu Cepat', text: 'Mohon periksa kembali data Anda.' })
      return
    }
    if (timing === 'timeout') {
      Swal.fire({ icon: 'error', title: 'Sesi Berakhir', text: 'Silakan muat ulang halaman.', confirmButtonText: 'Muat Ulang' })
        .then(() => location.reload())
      return
    }

    if (formBaru.nik.length !== 16 || !/^[0-9]+$/.test(formBaru.nik)) {
      setErrors(prev => ({ ...prev, nik: 'NIK harus 16 digit angka.' }))
      return
    }
    if (formBaru.tipe_pasien === 'bpjs' && !formBaru.no_bpjs) {
      setErrors(prev => ({ ...prev, no_bpjs: 'No BPJS wajib diisi untuk pasien BPJS.' }))
      return
    }

    const confirm = await Swal.fire({
      title: 'Konfirmasi Pendaftaran',
      html: '<p>Pastikan semua data yang Anda masukkan sudah benar.</p>',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Lanjutkan',
      cancelButtonText: 'Periksa Lagi',
      reverseButtons: true,
    })
    if (!confirm.isConfirmed) return

    setLoading(true)
    Swal.fire({ title: 'Memproses...', allowOutsideClick: false, didOpen: () => Swal.showLoading() })

    try {
      // ← wrap recaptcha sendiri, jangan biarkan crash seluruh flow
      let recaptchaToken = 'dev-bypass'
      try {
        if (executeRecaptcha) {
          recaptchaToken = await executeRecaptcha('pendaftaran_pasien')
        }
      } catch (recaptchaErr) {
        console.warn('reCAPTCHA gagal:', recaptchaErr.message)
        // lanjut dengan bypass token
      }

      const payload = {
        ...formBaru,
        recaptcha_token: recaptchaToken,
        form_timestamp: formLoadTime.current,
      }

      const res = await simpanPasien(payload)
      setDataPasien({
        id: res.data.pasien_id,
        ...formBaru,
      })
      Swal.close()
      navigate('/pendaftaran/form')

    } catch (err) {
      Swal.close()
      const errData = err.response?.data
      console.log('Error detail:', JSON.stringify(errData))
      if (errData?.errors) {
        setErrors(errData.errors)
      } else {
        Swal.fire({ icon: 'error', title: 'Gagal', text: errData?.message ?? 'Terjadi kesalahan sistem.' })
      }
    } finally {
      setLoading(false)
    }
  }

  // ============================================
  // SUBMIT PASIEN LAMA
  // ============================================
  const handleSubmitLama = async (e) => {
    e.preventDefault()

    // Honeypot
    if (formLama.company_website) return

    // Timing
    const timing = checkTiming()
    if (timing === 'fast') {
      Swal.fire({ icon: 'warning', title: 'Terlalu Cepat', text: 'Mohon periksa kembali data Anda.' })
      return
    }
    if (timing === 'timeout') {
      Swal.fire({ icon: 'error', title: 'Sesi Berakhir', text: 'Silakan muat ulang halaman.', confirmButtonText: 'Muat Ulang' })
        .then(() => location.reload())
      return
    }

    if (formLama.nik.length !== 16 || !/^[0-9]+$/.test(formLama.nik)) {
      setErrors(prev => ({ ...prev, nik: 'NIK harus 16 digit angka.' }))
      return
    }

    const confirm = await Swal.fire({
      title: 'Konfirmasi Pencarian',
      html: '<p>Pastikan NIK yang Anda masukkan sudah benar.</p>',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Cari',
      cancelButtonText: 'Periksa Lagi',
      reverseButtons: true,
    })
    if (!confirm.isConfirmed) return

    setLoading(true)
    Swal.fire({ title: 'Mencari...', allowOutsideClick: false, didOpen: () => Swal.showLoading() })

    try {
      const recaptchaToken = await executeRecaptcha('cari_pasien')

      const payload = {
        ...formLama,
        recaptcha_token: recaptchaToken,
        form_timestamp: formLoadTime.current,
      }

      const res = await cariPasien(payload)
      setDataPasien({
        id: res.data.pasien_id,
        ...res.data.pasien,
      })
      Swal.close()
      navigate('/pendaftaran/form')

    } catch (err) {
      Swal.close()
      const errData = err.response?.data
      if (errData?.errors) {
        setErrors(errData.errors)
      } else {
        Swal.fire({ icon: 'error', title: 'Tidak Ditemukan', text: errData?.message ?? 'Pasien tidak ditemukan.' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📋 Pendaftaran Online</h1>
        <p className="text-gray-500">Daftarkan diri Anda untuk berobat</p>
        <div className="w-16 h-1 bg-blue-600 mt-3 rounded"></div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-sm text-yellow-800">
        ⚠️ Jika belum tahu klinik atau dokter yang sesuai, pilih dokter dulu di halaman{' '}
        <a href="/dokter" className="font-semibold underline">Dokter & Jadwal</a> lalu kembali ke sini.
      </div>

      {/* Tab */}
      <div className="flex border-b border-gray-200 mb-6">
        {['baru', 'lama'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-3 font-semibold text-sm transition border-b-2 ${
              tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-600'
            }`}
          >
            {t === 'baru' ? '👤 Pasien Baru' : '🔍 Pasien Lama'}
          </button>
        ))}
      </div>

      {/* ============ FORM PASIEN BARU ============ */}
      {tab === 'baru' && (
        <form onSubmit={handleSubmitBaru} className="flex flex-col gap-4">

          {/* Honeypot - disembunyikan */}
          <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
            <input
              type="text"
              name="company_website"
              value={formBaru.company_website}
              onChange={handleChangeBaru}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <InputField label="No Rekam Medis (jika sudah punya)" name="no_rekam_medik"
            value={formBaru.no_rekam_medik} onChange={handleChangeBaru} placeholder="Contoh: RM0012" />

          <div>
            <InputField label="NIK *" name="nik" value={formBaru.nik}
              onChange={handleChangeBaru} placeholder="16 digit angka sesuai KTP" />
            {errors.nik && <p className="text-red-500 text-xs mt-1">{errors.nik[0] ?? errors.nik}</p>}
          </div>

          <div>
            <InputField label="Nama Lengkap *" name="nama" value={formBaru.nama}
              onChange={handleChangeBaru} placeholder="Sesuai KTP" />
            {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama[0] ?? errors.nama}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Alamat Lengkap *</label>
            <textarea name="alamat" value={formBaru.alamat} onChange={handleChangeBaru}
              rows={3} placeholder="Jalan, RT/RW, Kelurahan, Kecamatan"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required />
            {errors.alamat && <p className="text-red-500 text-xs mt-1">{errors.alamat[0] ?? errors.alamat}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Jenis Kelamin *</label>
            <select name="jenis_kelamin" value={formBaru.jenis_kelamin} onChange={handleChangeBaru}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option value="">-- Pilih Jenis Kelamin --</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
            {errors.jenis_kelamin && <p className="text-red-500 text-xs mt-1">{errors.jenis_kelamin[0]}</p>}
          </div>

          <div>
            <InputField label="No Telepon *" name="no_telepon" type="tel"
              value={formBaru.no_telepon} onChange={handleChangeBaru} placeholder="Contoh: 081234567890" />
            {errors.no_telepon && <p className="text-red-500 text-xs mt-1">{errors.no_telepon[0]}</p>}
          </div>

          <div>
            <InputField label="Tanggal Lahir *" name="tanggal_lahir" type="date"
              value={formBaru.tanggal_lahir} onChange={handleChangeBaru} placeholder="" />
            {errors.tanggal_lahir && <p className="text-red-500 text-xs mt-1">{errors.tanggal_lahir[0]}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Tipe Pasien *</label>
            <select name="tipe_pasien" value={formBaru.tipe_pasien} onChange={handleChangeBaru}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option value="">-- Pilih Tipe Pasien --</option>
              <option value="umum">Umum</option>
              <option value="bpjs">BPJS</option>
              <option value="lainnya">Lainnya</option>
            </select>
            {errors.tipe_pasien && <p className="text-red-500 text-xs mt-1">{errors.tipe_pasien[0]}</p>}
          </div>

          {formBaru.tipe_pasien === 'bpjs' && (
            <div>
              <InputField label="No BPJS *" name="no_bpjs" value={formBaru.no_bpjs}
                onChange={handleChangeBaru} placeholder="Masukkan nomor BPJS" />
              {errors.no_bpjs && <p className="text-red-500 text-xs mt-1">{errors.no_bpjs[0]}</p>}
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-lg transition">
            {loading ? 'Memproses...' : 'Lanjut ke Pendaftaran →'}
          </button>
        </form>
      )}

      {/* ============ FORM PASIEN LAMA ============ */}
      {tab === 'lama' && (
        <form onSubmit={handleSubmitLama} className="flex flex-col gap-4">

          <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
            <input type="text" name="company_website" value={formLama.company_website}
              onChange={handleChangeLama} tabIndex={-1} autoComplete="off" />
          </div>

          <div>
            <InputField label="NIK *" name="nik" value={formLama.nik}
              onChange={handleChangeLama} placeholder="16 digit angka sesuai KTP" />
            {errors.nik && <p className="text-red-500 text-xs mt-1">{errors.nik[0] ?? errors.nik}</p>}
          </div>

          <div>
            <InputField label="No Rekam Medis (Opsional)" name="no_rekam_medik"
              value={formLama.no_rekam_medik} onChange={handleChangeLama} placeholder="Contoh: RM0012" />
            <p className="text-xs text-gray-400 mt-1">Jika punya, akan otomatis tersimpan di sistem</p>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-lg transition">
            {loading ? 'Mencari...' : '🔍 Cari Data Pasien'}
          </button>
        </form>
      )}
    </div>
  )
}

// ============================================
// WRAPPER dengan reCAPTCHA Provider
// ============================================
const PilihPasien = () => (
  <GoogleReCaptchaProvider reCaptchaKey={SITE_KEY}>
    <PilihPasienInner />
  </GoogleReCaptchaProvider>
)

export default PilihPasien