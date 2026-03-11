import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { useHomeCareForm } from '../../hooks/useHomeCare'
import PageLayout from '../../components/layout/PageLayout'
import HomeCareForm from '../../components/homecare/HomeCareForm'

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY

const HomeCareIndex = () => {
  const { section, layanans, loading } = useHomeCareForm()

  return (
    <GoogleReCaptchaProvider reCaptchaKey={SITE_KEY}>
      <PageLayout section={section} loading={loading}>
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🏠 Home Care</h1>
            <p className="text-gray-500">Layanan perawatan medis langsung ke rumah Anda</p>
            <div className="w-16 h-1 bg-blue-600 mt-3 rounded"></div>
          </div>
          <HomeCareForm layanans={layanans} />
          <div className="mt-6 text-center">
            <a href="/pelayanan/home-care/lacak"
              className="text-blue-600 hover:underline text-sm">
              🔍 Lacak permintaan yang sudah ada
            </a>
          </div>
        </div>
      </PageLayout>
    </GoogleReCaptchaProvider>
  )
}

export default HomeCareIndex