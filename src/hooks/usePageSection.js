// E:\laragon\www\simrs-react\src\hooks\usePageSection.js
import { useState, useEffect } from 'react'
import { getPageBySlug } from '../services/api'

const usePageSection = (slug) => {
  const [section, setSection] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    getPageBySlug(slug)
      .then(res => { setSection(res.data.section); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [slug])

  return { section, loading, error }
}

export default usePageSection