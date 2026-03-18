// E:\laragon\www\simrs-react\src\hooks\useRawatInap.js
import { useState, useEffect } from 'react'
import { getRawatInap } from '../services/api'

const useRawatInap = () => {
  const [kamarList, setKamarList] = useState([])
  const [daftarKelas, setDaftarKelas] = useState([])
  const [meta, setMeta] = useState(null)
  const [kelasId, setKelasId] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = { page }
    if (kelasId) params.kelas = kelasId

    getRawatInap(params)
      .then(res => {
        setKamarList(res.data.kamarList.data ?? [])
        setMeta(res.data.kamarList)
        setDaftarKelas(prev => prev.length === 0 ? (res.data.daftarKelas ?? []) : prev)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [kelasId, page, daftarKelas.length])

  const handleKelasChange = (e) => {
    setKelasId(e.target.value)
    setPage(1)
    setLoading(true)
  }

  const handlePageChange = (p) => {
    setPage(p)
    setLoading(true)
  }

  return { kamarList, daftarKelas, meta, kelasId, page, loading, handleKelasChange, handlePageChange }
}

export default useRawatInap