import { useState, useEffect } from 'react'
import { getPageBySlug } from '../services/api'

export const useHomeCareForm = () => {
  const [section, setSection] = useState(null)
  const [layanans, setLayanans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPageBySlug('homecare')
      .then(res => {
        setSection(res.data.section)
        setLayanans(res.data.layanans ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { section, layanans, loading }
}