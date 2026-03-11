import { useState, useEffect } from 'react'
import { getPageBySlug } from '../services/api'
import PageSection from '../components/ui/PageSection'
import Spinner from '../components/ui/Spinner'

const Profil = () => {
  const [section, setSection] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPageBySlug('profil')
      .then(res => { setSection(res.data.section); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <Spinner />

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Profil RS</h1>
      <PageSection section={section} />
    </div>
  )
}

export default Profil