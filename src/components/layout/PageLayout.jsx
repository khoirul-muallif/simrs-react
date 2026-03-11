import PageSection from '../ui/PageSection'
import Spinner from '../ui/Spinner'

const PageLayout = ({ title, section, loading, children }) => {
  if (loading) return <Spinner />

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {title && <h1 className="text-3xl font-bold text-gray-800 mb-8">{title}</h1>}
      {section && <PageSection section={section} />}
      {children}
    </div>
  )
}

export default PageLayout