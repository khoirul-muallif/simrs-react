import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlogBySlug } from '../services/api'
import { getImageUrl } from '../utils/formatImage'
import { formatTanggal } from '../utils/formatDate'
import Spinner from '../components/ui/Spinner'

// ← hapus formatTanggal dan getImageUrl lokal, sudah di utils

const BlogDetail = () => {
  const { slug } = useParams()
  const [artikel, setArtikel] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    getBlogBySlug(slug)
      .then(res => {
        setArtikel(res.data.post)
        setCategories(res.data.categories)
        setLoading(false)
      })
      .catch(err => {
        if (err.response?.status === 404) setNotFound(true)
        setLoading(false)
      })
  }, [slug])

  if (loading) return <Spinner className="min-h-screen" />

  if (notFound || !artikel) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p className="text-5xl">😕</p>
      <p className="text-gray-400 text-xl">Artikel tidak ditemukan</p>
      <Link to="/blog" className="text-blue-600 hover:underline">← Kembali ke Blog</Link>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      <div className="text-sm text-gray-400 mb-6 flex items-center gap-1">
        <Link to="/" className="hover:text-blue-600">Beranda</Link>
        <span>›</span>
        <Link to="/blog" className="hover:text-blue-600">Blog</Link>
        <span>›</span>
        <span className="text-gray-600 line-clamp-1">{artikel.title}</span>
      </div>

      <Link to={`/blog/categories/${artikel.category?.slug}`}
        className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full hover:bg-blue-200 transition">
        {artikel.category?.name}
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-3 leading-snug">
        {artikel.title}
      </h1>

      <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
        <span>✍️ {artikel.author?.name}</span>
        <span>📅 {formatTanggal(artikel.published_at ?? artikel.created_at)}</span>
      </div>

      {getImageUrl(artikel.image) && (
        <img src={getImageUrl(artikel.image)} alt={artikel.title}
          className="w-full h-72 object-cover rounded-2xl mb-8" />
      )}

      <div className="prose prose-blue max-w-none"
        dangerouslySetInnerHTML={{ __html: artikel.body }} />

      <div className="mt-12 pt-6 border-t border-gray-200">
        <Link to="/blog"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition">
          ← Kembali ke Blog
        </Link>
      </div>

      {categories.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🗂 Kategori</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(kat => (
              <Link key={kat.id} to={`/blog/categories/${kat.slug}`}
                className="px-4 py-2 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition">
                {kat.name}
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default BlogDetail