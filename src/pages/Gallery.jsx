import { useEffect } from 'react'
import useGallery from '../hooks/useGallery'
import GalleryCard from '../components/gallery/GalleryCard'
import Pagination from '../components/ui/Pagination'
import Spinner from '../components/ui/Spinner'

const tabs = [
  { label: 'Semua', value: '' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'TikTok', value: 'tiktok' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Gambar', value: 'image' },
]

const Gallery = () => {
  const { items, meta, type, page, loading, handleTypeChange, handlePageChange } = useGallery()

  // Load Instagram & TikTok embed scripts
  useEffect(() => {
    const scripts = [
      'https://www.instagram.com/embed.js',
      'https://www.tiktok.com/embed.js',
    ]
    scripts.forEach(src => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const s = document.createElement('script')
        s.src = src
        s.async = true
        document.body.appendChild(s)
      }
    })
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 uppercase mb-2">Gallery & Video</h1>
        <p className="text-gray-400">Dokumentasi kegiatan dan video informasi</p>
        <div className="mx-auto w-20 h-1 bg-blue-600 mt-3 rounded"></div>
      </div>

      {/* Tab Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200 pb-4">
        {tabs.map(tab => (
          <button key={tab.value} onClick={() => handleTypeChange(tab.value)}
            className={`px-4 py-2 text-sm font-medium transition border-b-2 ${
              type === tab.value
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-blue-600'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {meta && (
        <p className="text-center text-sm text-gray-400 mb-6">
          {type
            ? `Menampilkan ${type.charAt(0).toUpperCase() + type.slice(1)} — ${meta.total} konten`
            : `Total ${meta.total} konten tersedia`
          }
        </p>
      )}

      {loading && <Spinner />}

      {!loading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => <GalleryCard key={item.id} item={item} />)}
          </div>

          {items.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">📂</p>
              <p>Belum ada konten untuk kategori ini</p>
            </div>
          )}

          {meta && meta.last_page > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination meta={meta} page={page} onPageChange={handlePageChange} />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Gallery