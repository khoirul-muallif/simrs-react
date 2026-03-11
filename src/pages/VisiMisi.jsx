// pages/VisiMisi.jsx
import usePageSection from '../hooks/usePageSection'
import PageSection from '../components/ui/PageSection'
import Spinner from '../components/ui/Spinner'

const VisiMisi = () => {
  const { section, loading } = usePageSection('visimisi')
  if (loading) return <Spinner />
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Visi & Misi</h1>
      <PageSection section={section} />
    </div>
  )
}
export default VisiMisi

