import { useState, useEffect } from 'react'
import { getMitra } from '../services/api'
import Spinner from '../components/ui/Spinner'
import { getImageUrl } from '../utils/formatImage'

const Mitra = () => {
  const [logos, setLogos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMitra()
      .then(res => { setLogos(res.data.logos ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <Spinner />

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Mitra Kami</h2>
        <p className="text-gray-500">Kami bekerja sama dengan berbagai institusi untuk meningkatkan layanan kesehatan.</p>
        <div className="mx-auto w-20 h-1 bg-blue-600 mt-3 rounded"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
        {logos.map(logo => (
          <a key={logo.id} href={logo.url} target="_blank" rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center hover:shadow-md hover:-translate-y-1 transition-all w-full">
            <img
              src={getImageUrl(logo.src)}
              alt={logo.alt}
              className="h-20 object-contain mb-2"
            />
            {logo.title && <h6 className="text-sm text-gray-700 text-center font-medium">{logo.title}</h6>}
          </a>
        ))}
      </div>

      {logos.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🤝</p>
          <p>Data mitra belum tersedia</p>
        </div>
      )}
    </div>
  )
}

export default Mitra