import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPengumumanBySlug } from '../services/api'

const formatTanggal = (tanggal) =>
  new Date(tanggal).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

const PengumumanDetail = () => {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getPengumumanBySlug(id)
      .then(data => {
        setItem(data || null)
        setLoading(false)
      })
      .catch(() => {
        setError('Gagal memuat data.')
        setLoading(false)
      })
  }, [id])

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
    </div>
  )

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p className="text-red-500">❌ {error}</p>
      <Link to="/pengumuman" className="text-blue-600 hover:underline">← Kembali</Link>
    </div>
  )

  if (!item) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p className="text-5xl">😕</p>
      <p className="text-gray-400 text-xl">Pengumuman tidak ditemukan</p>
      <Link to="/pengumuman" className="text-blue-600 hover:underline">← Kembali</Link>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-sm text-gray-400 mb-6 flex items-center gap-1">
        <Link to="/" className="hover:text-blue-600">Beranda</Link>
        <span>›</span>
        <Link to="/pengumuman" className="hover:text-blue-600">Pengumuman</Link>
        <span>›</span>
        <span className="text-gray-600 line-clamp-1">{item.judul}</span>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">{item.kategori}</span>
        {item.penting && <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">🔴 Penting</span>}
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-3">{item.judul}</h1>
      <p className="text-sm text-gray-400 mb-8">📅 {formatTanggal(item.tanggal)}</p>
      <div className="w-full h-px bg-gray-200 mb-8"></div>
      <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: item.isi }} />
      <div className="mt-12 pt-6 border-t border-gray-200">
        <Link to="/pengumuman" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition">
          ← Kembali ke Pengumuman
        </Link>
      </div>
    </div>
  )
}

export default PengumumanDetail