import { useState, useEffect } from 'react'
import { getDokter } from '../services/api'
import DokterFilter from '../components/dokter/DokterFilter'
import DokterCard from '../components/dokter/DokterCard'
import Pagination from '../components/ui/Pagination'  // ← pindah ke ui/
import Spinner from '../components/ui/Spinner'        // ← pakai Spinner

const Dokter = () => {
  const [dokter, setDokter] = useState([])
  const [polikliniks, setPolikliniks] = useState([])
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [poliklinikId, setPoliklinikId] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const params = { page }
    if (keyword) params.nm_dokter = keyword
    if (poliklinikId) params.poliklinik_id = poliklinikId

    getDokter(params)
      .then(res => {
        setDokter(res.data.dokters?.data ?? [])
        setMeta(res.data.dokters)
        setPolikliniks(prev => prev.length === 0 ? (res.data.polikliniks ?? []) : prev)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [keyword, poliklinikId, page, polikliniks.length])

  const handleReset = () => {
    setKeyword('')
    setPoliklinikId('')
    setPage(1)
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Cari Jadwal Dokter</h3>

      <DokterFilter
        keyword={keyword}
        poliklinikId={poliklinikId}
        polikliniks={polikliniks}
        onKeywordChange={val => { setKeyword(val); setPage(1) }}
        onPoliklinikChange={val => { setPoliklinikId(val); setPage(1) }}
        onReset={handleReset}
      />

      {meta && (
        <p className="text-sm text-gray-400 mb-4">
          Menampilkan {meta.from}–{meta.to} dari total {meta.total} dokter
        </p>
      )}

      {loading && <Spinner />}

      {!loading && dokter.map(d => (
        <DokterCard key={d.id} dokter={d} />
      ))}

      {!loading && dokter.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p>Dokter tidak ditemukan</p>
        </div>
      )}

      {meta && meta.last_page > 1 && (
        <Pagination meta={meta} page={page} onPageChange={setPage} />
      )}
    </div>
  )
}

export default Dokter