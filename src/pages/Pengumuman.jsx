import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { getPengumuman } from '../services/api'

const formatTanggal = (tanggal) => {
  return new Date(tanggal).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

const Pengumuman = () => {
  const [pengumuman, setPengumuman] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Nanti diganti: axios.get('/api/pengumuman')
    setTimeout(() => {
      getPengumuman().then(res => setPengumuman(res.data))
      setLoading(false)
    }, 500)
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📢 Pengumuman</h1>
        <p className="text-gray-500">Informasi terbaru dari RS Sehat Sejahtera</p>
        <div className="w-16 h-1 bg-blue-600 mt-3 rounded"></div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      )}

      {/* List */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pengumuman.map((item) => (
            <Card
              key={item.id}
              to={`/pengumuman/${item.slug}`}
              badge={item.kategori}
              badgeColor="blue"
              title={item.judul}
              date={formatTanggal(item.tanggal)}
              description={item.ringkasan}
              penting={item.penting}
            />
          ))}
        </div>
      )}

    </div>
  )
}

export default Pengumuman