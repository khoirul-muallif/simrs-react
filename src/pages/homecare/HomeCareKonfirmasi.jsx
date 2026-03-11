import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getKonfirmasiHomeCare } from '../../services/api'
import Spinner from '../../components/ui/Spinner'

const HomeCareKonfirmasi = () => {
  const { token } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getKonfirmasiHomeCare(token)
      .then(res => { setData(res.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [token])

  if (loading) return <Spinner />
  if (!data) return <div className="text-center py-20 text-gray-400">Data tidak ditemukan</div>

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">✅</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Pendaftaran Berhasil</h1>
        <p className="text-gray-500">Simpan kode unik berikut untuk melacak permintaan Anda</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center mb-6">
        <p className="text-sm text-blue-600 mb-1">Kode Unik Anda</p>
        <p className="text-3xl font-bold text-blue-800 tracking-widest">{data.kode_unik}</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-gray-800 mb-4">Detail Permintaan</h2>
        <dl className="grid grid-cols-2 gap-y-3 text-sm">
          <dt className="text-gray-400">Nama</dt>
          <dd className="font-medium text-gray-800">{data.nama}</dd>
          <dt className="text-gray-400">Layanan</dt>
          <dd className="font-medium text-gray-800">{data.layanan?.nama_layanan}</dd>
          <dt className="text-gray-400">Alamat</dt>
          <dd className="font-medium text-gray-800">{data.alamat}</dd>
          <dt className="text-gray-400">Status</dt>
          <dd className="font-medium text-gray-800 capitalize">{data.status ?? 'Menunggu'}</dd>
        </dl>
      </div>

      <Link to="/" className="block w-full text-center py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition">
        Kembali ke Beranda
      </Link>
    </div>
  )
}

export default HomeCareKonfirmasi