// FormPendaftaran.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import usePendaftaran from '../../hooks/usePendaftaran'        // ← dari hooks/
import { getFormPendaftaran, simpanPendaftaran } from '../../services/api'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import { Indonesian } from 'flatpickr/dist/l10n/id.js'

const hariMap = {
  Monday: 'Senin', Tuesday: 'Selasa', Wednesday: 'Rabu',
  Thursday: 'Kamis', Friday: 'Jumat', Saturday: 'Sabtu', Sunday: 'Minggu',
}

const FormPendaftaran = () => {
  const navigate = useNavigate()
  const { dataPasien, setDataPendaftaran } = usePendaftaran()

  const [pasien, setPasien] = useState(null)
  const [polikliniks, setPolikliniks] = useState([])
  const [poliklinikId, setPoliklinikId] = useState('')
  const [dokterId, setDokterId] = useState('')
  const [tanggalPeriksa, setTanggalPeriksa] = useState('')
  const [keluhan, setKeluhan] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!dataPasien?.id) { navigate('/pendaftaran'); return }

    getFormPendaftaran(dataPasien.id)
      .then(res => {
        setPasien(res.data.pasien)
        setPolikliniks(res.data.polikliniks ?? [])
        // Jika dari halaman pilih dokter
        if (res.data.selected_poliklinik_id) setPoliklinikId(String(res.data.selected_poliklinik_id))
        if (res.data.selected_dokter_id) setDokterId(String(res.data.selected_dokter_id))
        setLoading(false)
      })
      .catch(() => { navigate('/pendaftaran') })
  }, [dataPasien, navigate])

  const poliDipilih = polikliniks.find(p => p.id === parseInt(poliklinikId))
  const dokterByPoli = poliDipilih?.dokters ?? []
  const dokterDipilih = dokterByPoli.find(d => d.id === parseInt(dokterId))

  const tanggalTersedia = () => {
    if (!dokterDipilih) return []
    const hariJadwal = dokterDipilih.jadwal.map(j => j.hari)
    const hasil = []
    const today = new Date()
    for (let i = 0; i <= 30; i++) {
      const tgl = new Date(today)
      tgl.setDate(today.getDate() + i)
      const namaHari = hariMap[tgl.toLocaleDateString('en-US', { weekday: 'long' })]
      if (hariJadwal.includes(namaHari)) {
        hasil.push(tgl.toISOString().split('T')[0])
      }
    }
    return hasil
  }

  const handlePoliChange = (e) => {
    setPoliklinikId(e.target.value)
    setDokterId('')
    setTanggalPeriksa('')
  }

  const handleDokterChange = (e) => {
    setDokterId(e.target.value)
    setTanggalPeriksa('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const confirm = await Swal.fire({
      title: 'Konfirmasi Pendaftaran',
      text: 'Apakah data sudah benar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Lanjutkan',
      cancelButtonText: 'Batal',
      reverseButtons: true,
    })
    if (!confirm.isConfirmed) return

    setSubmitting(true)
    Swal.fire({ title: 'Mengirim data...', allowOutsideClick: false, didOpen: () => Swal.showLoading() })

    try {
      const res = await simpanPendaftaran(dataPasien.id, {
        poliklinik_id: poliklinikId,
        dokter_id: dokterId || null,
        tanggal_periksa: tanggalPeriksa,
        keluhan: keluhan || null,
        email_fake: '', // honeypot
      })

      // Simpan data untuk halaman konfirmasi
      setDataPendaftaran({
        pendaftaran_id: res.data.pendaftaran_id,
        wa_url: res.data.wa_url,
        poliklinik: poliDipilih,
        dokter: dokterDipilih ?? null,
        tanggal_periksa: tanggalPeriksa,
        keluhan,
      })

      Swal.close()
      navigate('/pendaftaran/konfirmasi')

    } catch (err) {
      Swal.close()
      const errData = err.response?.data
      if (errData?.errors) {
        setErrors(errData.errors)
      } else {
        Swal.fire({ icon: 'error', title: 'Gagal', text: errData?.message ?? 'Terjadi kesalahan.' })
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🏥 Form Pendaftaran</h1>
        <p className="text-gray-500">Pilih poliklinik, dokter, dan jadwal periksa</p>
        <div className="w-16 h-1 bg-blue-600 mt-3 rounded"></div>
      </div>

      {/* Info Pasien */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-700 font-semibold mb-1">👤 Data Pasien</p>
        <p className="text-gray-800 font-bold">{pasien?.nama}</p>
        <p className="text-gray-500 text-sm">NIK: {pasien?.nik}</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-sm text-yellow-800">
        ⚠️ Jika belum tahu klinik/dokter yang sesuai, lihat informasi di bagian bawah lalu klik <strong>Pilih Dokter Ini</strong>.
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Poliklinik */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Poliklinik *</label>
          <select value={poliklinikId} onChange={handlePoliChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            <option value="">-- Pilih Poliklinik --</option>
            {polikliniks.map(p => (
              <option key={p.id} value={p.id}>{p.nm_poli}</option>
            ))}
          </select>
          {errors.poliklinik_id && <p className="text-red-500 text-xs">{errors.poliklinik_id[0]}</p>}
        </div>

        {/* Dokter */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Dokter (Opsional)</label>
          <select value={dokterId} onChange={handleDokterChange} disabled={!poliklinikId}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed">
            <option value="">-- Pilih Dokter --</option>
            {dokterByPoli.map(d => (
              <option key={d.id} value={d.id}>
                {d.nm_dokter} — {d.spesialis?.nm_sps}
              </option>
            ))}
          </select>
          {!poliklinikId && <p className="text-xs text-gray-400">Pilih poliklinik terlebih dahulu</p>}
          {errors.dokter_id && <p className="text-red-500 text-xs">{errors.dokter_id[0]}</p>}
        </div>

        {/* Info jadwal dokter dipilih */}
        {dokterDipilih && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-green-700 mb-2">
              📅 Jadwal {dokterDipilih.nm_dokter}:
            </p>
            <div className="flex flex-wrap gap-2">
              {dokterDipilih.jadwal.map(j => (
                <span key={j.id} className="text-xs bg-white border border-green-300 text-green-700 px-3 py-1 rounded-full">
                  {j.hari} ({j.jam_mulai?.slice(0,5)} - {j.jam_selesai?.slice(0,5)})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tanggal Periksa */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Tanggal Periksa *</label>
          <Flatpickr
            value={tanggalPeriksa}
            onChange={([date]) => setTanggalPeriksa(
              date.toISOString().split('T')[0]
            )}
            options={{
              minDate: 'today',
              dateFormat: 'Y-m-d',
              locale: Indonesian,
              // Kalau ada dokter, hanya enable tanggal yang ada jadwalnya
              ...(dokterDipilih ? { enable: tanggalTersedia() } : {}),
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            placeholder="Pilih tanggal periksa"
          />
          {errors.tanggal_periksa && <p className="text-red-500 text-xs">{errors.tanggal_periksa[0]}</p>}
        </div>
        
        {/* Keluhan */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Keluhan (Opsional)</label>
          <textarea value={keluhan} onChange={e => setKeluhan(e.target.value)}
            rows={3} placeholder="Ceritakan keluhan Anda..." maxLength={500}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          <p className="text-xs text-gray-400 text-right">{keluhan.length}/500</p>
        </div>

        <button type="submit" disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-lg transition">
          {submitting ? 'Memproses...' : 'Daftar Sekarang →'}
        </button>
      </form>

      {/* Accordion Info Poliklinik & Dokter */}
      <hr className="my-10" />
      <h5 className="text-center font-semibold text-gray-700 mb-6">— Informasi Poliklinik & Dokter —</h5>
      <div className="flex flex-col gap-3">
        {polikliniks.filter(p => p.dokters?.length > 0).map((poli, idx) => (
          <Accordion key={poli.id} poli={poli} defaultOpen={idx === 0}
            onPilihDokter={(dokterItem) => {
              setPoliklinikId(String(poli.id))
              setDokterId(String(dokterItem.id))
              setTanggalPeriksa('')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Accordion component
const Accordion = ({ poli, defaultOpen, onPilihDokter }) => {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-5 py-4 font-semibold text-gray-700 hover:bg-gray-50 transition">
        {poli.nm_poli}
        <span>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="px-5 py-4 border-t border-gray-100">
          {poli.dokters.map(d => (
            <div key={d.id} className="mb-4 pb-4 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
              <h6 className="font-semibold text-gray-800">{d.nm_dokter}</h6>
              <p className="text-sm text-gray-500 mb-1">Spesialis: {d.spesialis?.nm_sps ?? '-'}</p>
              <p className="text-sm text-gray-500 mb-2">
                Jadwal:{' '}
                {d.jadwal?.length > 0
                  ? d.jadwal.map(j => `${j.hari} (${j.jam_mulai?.slice(0,5)}-${j.jam_selesai?.slice(0,5)})`).join(', ')
                  : 'Tidak ada jadwal'
                }
              </p>
              <button onClick={() => onPilihDokter(d)}
                className="px-4 py-1.5 border border-blue-500 text-blue-600 text-sm rounded-lg hover:bg-blue-50 transition">
                Pilih Dokter Ini
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FormPendaftaran