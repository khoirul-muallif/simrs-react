import { useState, useEffect } from 'react'
import { getIndikatorMutu } from '../services/api'

const useIndikatorMutu = () => {
  const [section, setSection] = useState(null)
  const [periodes, setPeriodes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getIndikatorMutu()
      .then(res => {
        setSection(res.data.section)
        setPeriodes(res.data.periodes ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { section, periodes, loading }
}

export default useIndikatorMutu