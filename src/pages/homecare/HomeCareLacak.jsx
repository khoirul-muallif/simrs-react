import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import Swal from 'sweetalert2'
import { cariHomeCare } from '../../services/api'
import InputField from '../../components/ui/InputField'

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY

const HomeCareLacakInner = () => {
  const navigate = useNavigate()
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [kode, setKode] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailFake, setEmailFake] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (emailFake) return

    setLoading(true)
    Swal.fire({ title: 'Mencari...', allowOutsideClick: false, didOpen: () => Swal.showLoading() })

    try {
      let recaptchaToken = 'dev-bypass'
      try {
        if (executeRecaptcha) recaptchaToken = await executeRecaptcha('homecare')
      } catch { /* bypass */ }

      const res = await cariHomeCare({ kode, recaptcha_token: recaptchaToken, email_fake: emailFake })
      Swal.close()
      navigate(`/pelayanan/home-care/track/${res.data.kode}`)

    } catch (err) {
      Swal.close()
      Swal.fire({ icon: 'error', title: 'Tidak Ditemukan', text: err.response?.data?.message ?? 'Kode tidak valid.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🔍 Lacak Home Care</h1>
        <p className="text-gray-500">Masukkan kode unik untuk melihat status permintaan</p>
        <div className="w-16 h-1 bg-blue-600 mt-3 rounded"></div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div style={{ display: 'none' }} aria-hidden="true">
          <input type="text" value={emailFake} onChange={e => setEmailFake(e.target.value)} tabIndex={-1} />
        </div>
        <InputField label="Kode Unik *" name="kode" value={kode}
          onChange={e => setKode(e.target.value.toUpperCase())}
          placeholder="Contoh: ABCD123456" />
        <button type="submit" disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-lg transition">
          {loading ? 'Mencari...' : 'Cari Permintaan'}
        </button>
      </form>
    </div>
  )
}

const HomeCareLacak = () => (
  <GoogleReCaptchaProvider reCaptchaKey={SITE_KEY}>
    <HomeCareLacakInner />
  </GoogleReCaptchaProvider>
)

export default HomeCareLacak