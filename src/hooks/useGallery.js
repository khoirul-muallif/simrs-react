import { useState, useEffect } from 'react'
import { getGallery } from '../services/api'

const useGallery = () => {
  const [items, setItems] = useState([])
  const [meta, setMeta] = useState(null)
  const [type, setType] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getGallery({ page, ...(type ? { type } : {}) })
      .then(res => {
        setItems(res.data.data ?? [])
        setMeta(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [type, page])

  const handleTypeChange = (val) => {
    setType(val)
    setPage(1)
    setLoading(true)
  }

  const handlePageChange = (p) => {
    setPage(p)
    setLoading(true)
  }

  return { items, meta, type, page, loading, handleTypeChange, handlePageChange }
}

export default useGallery