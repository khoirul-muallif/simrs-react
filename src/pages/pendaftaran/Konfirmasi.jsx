// Konfirmasi.jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import usePendaftaran from '../../hooks/usePendaftaran'        // ← dari hooks/

const Konfirmasi = () => {
  const navigate = useNavigate()
  const { dataPasien, dataPendaftaran, reset } = usePendaftaran()

  useEffect(() => {
    if (!dataPasien || !dataPendaftaran) navigate('/pendaftaran')
  }, [dataPasien, dataPendaftaran, navigate])

  if (!dataPasien || !dataPendaftaran) return null

  const formatTanggal = (tgl) => new Date(tgl).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  // wa_url sudah digenerate Laravel — langsung pakai
  const waUrl = dataPendaftaran.wa_url

  const handleSelesai = () => {
    reset()
    navigate('/')
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">✅</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Konfirmasi Pendaftaran</h1>
        <p className="text-gray-500">Periksa kembali data Anda sebelum konfirmasi via WhatsApp</p>
        <p className="text-sm text-green-500 mt-2">✅ Data tersimpan di sistem</p>
      </div>

      {/* Tombol WA atas */}
      <a href={waUrl} target="_blank" rel="noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl mb-6 transition text-lg">
        <FaWhatsapp className="text-2xl" />
        Kirim ke WhatsApp Admin RS
      </a>

      {/* Card Data */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-bold text-gray-800 mb-4 text-lg">👤 Data Pasien</h2>
          <dl className="grid grid-cols-2 gap-y-3 text-sm">
            <dt className="text-gray-400">Nama</dt>
            <dd className="font-medium text-gray-800">{dataPasien.nama}</dd>
            <dt className="text-gray-400">NIK</dt>
            <dd className="font-medium text-gray-800">{dataPasien.nik}</dd>
            <dt className="text-gray-400">No Rekam Medik</dt>
            <dd className="font-medium text-gray-800">{dataPasien.no_rekam_medik ?? '-'}</dd>
            <dt className="text-gray-400">Jenis Kelamin</dt>
            <dd className="font-medium text-gray-800">{dataPasien.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</dd>
            <dt className="text-gray-400">Tanggal Lahir</dt>
            <dd className="font-medium text-gray-800">
              {new Date(dataPasien.tanggal_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </dd>
            <dt className="text-gray-400">Tipe Pasien</dt>
            <dd className="font-medium text-gray-800 capitalize">{dataPasien.tipe_pasien}</dd>
            {dataPasien.no_bpjs && (
              <>
                <dt className="text-gray-400">No BPJS</dt>
                <dd className="font-medium text-gray-800">{dataPasien.no_bpjs}</dd>
              </>
            )}
            <dt className="text-gray-400">Telepon</dt>
            <dd className="font-medium text-gray-800">{dataPasien.no_telepon}</dd>
            <dt className="text-gray-400">Alamat</dt>
            <dd className="font-medium text-gray-800">{dataPasien.alamat}</dd>
          </dl>
        </div>
        <div className="p-6">
          <h2 className="font-bold text-gray-800 mb-4 text-lg">🏥 Data Pendaftaran</h2>
          <dl className="grid grid-cols-2 gap-y-3 text-sm">
            <dt className="text-gray-400">Poliklinik</dt>
            <dd className="font-medium text-gray-800">{dataPendaftaran.poliklinik?.nm_poli ?? '-'}</dd>
            <dt className="text-gray-400">Dokter</dt>
            <dd className="font-medium text-gray-800">{dataPendaftaran.dokter?.nm_dokter ?? '-'}</dd>
            <dt className="text-gray-400">Tanggal Periksa</dt>
            <dd className="font-medium text-gray-800">{formatTanggal(dataPendaftaran.tanggal_periksa)}</dd>
            <dt className="text-gray-400">Keluhan</dt>
            <dd className="font-medium text-gray-800">{dataPendaftaran.keluhan || '-'}</dd>
          </dl>
        </div>
      </div>

      <a href={waUrl} target="_blank" rel="noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl mb-4 transition">
        <FaWhatsapp className="text-xl" />
        Kirim ke WhatsApp Admin RS
      </a>

      <button onClick={handleSelesai}
        className="w-full py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition font-medium">
        Kembali ke Beranda
      </button>
    </div>
  )
}

export default Konfirmasi