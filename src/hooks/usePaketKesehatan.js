import { useState, useEffect } from 'react'
import { getPaketKesehatan } from '../services/api'

const usePaketKesehatan = () => {
  const [layanan, setLayanan] = useState([])
  const [paketList, setPaketList] = useState([])
  const [meta, setMeta] = useState(null)
  const [selectPaket, setSelectPaket] = useState('')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = { page }
    if (selectPaket) params.select_paket = selectPaket
    if (search) params.search = search

    getPaketKesehatan(params)
      .then(res => {
        setLayanan(res.data.layanan.data ?? [])
        setMeta(res.data.layanan)
        setPaketList(prev => prev.length === 0 ? (res.data.paketList ?? []) : prev)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [selectPaket, search, page, paketList.length])

  const handleSelectPaket = (e) => {
    setSelectPaket(e.target.value)
    setSearch('')
    setSearchInput('')
    setPage(1)
    setLoading(true)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(searchInput)
    setSelectPaket('')
    setPage(1)
    setLoading(true)
  }

  const handlePageChange = (p) => {
    setPage(p)
    setLoading(true)
  }

  return {
    layanan, paketList, meta, selectPaket, search,
    searchInput, setSearchInput, page, loading,
    handleSelectPaket, handleSearch, handlePageChange
  }
}

export default usePaketKesehatan