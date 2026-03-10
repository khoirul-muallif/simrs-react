import { useState, useEffect } from 'react'
import { getBlogList } from '../services/api'
import Spinner from '../components/ui/Spinner'
import BlogCard from '../components/blog/BlogCard'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [kategoriAktif, setKategoriAktif] = useState('Semua')

  useEffect(() => {
    getBlogList()
      .then(res => {
        setPosts(res.data.posts.data)
        setCategories(res.data.categories)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const postsFiltered = kategoriAktif === 'Semua'
    ? posts
    : posts.filter(item => item.category?.name === kategoriAktif)

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📰 Blog Kesehatan</h1>
        <p className="text-gray-500">Artikel dan informasi kesehatan terkini</p>
        <div className="w-16 h-1 bg-blue-600 mt-3 rounded"></div>
      </div>

      {loading && <Spinner />}

      {!loading && (
        <>
          <div className="flex flex-wrap gap-2 mb-8">
            {['Semua', ...categories.map(k => k.name)].map(kat => (
              <button key={kat} onClick={() => setKategoriAktif(kat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  kategoriAktif === kat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}>
                {kat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postsFiltered.map(item => (
              <BlogCard key={item.id} item={item} />
            ))}
          </div>

          {postsFiltered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">📭</p>
              <p>Tidak ada artikel untuk kategori ini</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Blog