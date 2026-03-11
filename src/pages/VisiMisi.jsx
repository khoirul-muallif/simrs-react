// pages/VisiMisi.jsx — 10 baris
import usePageSection from '../hooks/usePageSection'
import PageLayout from '../components/layout/PageLayout'

const VisiMisi = () => {
  const { section, loading } = usePageSection('visimisi')
  return <PageLayout title="Visi & Misi" section={section} loading={loading} />
}
export default VisiMisi