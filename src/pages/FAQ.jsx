import { useState, useEffect } from 'react'
import Accordion from '../components/Accordion'
import { getFaq } from '../services/api'

const FAQ = () => {
  const [faq, setFaq] = useState([])
  const [loading, setLoading] = useState(true)
  const [kategoriAktif, setKategoriAktif] = useState('Semua')

  useEffect(() => {
    getFaq()
      .then(res => {
        setFaq(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const kategoriList = ['Semua', ...new Set(faq.map(item => item.kategori))]
  const faqFiltered = kategoriAktif === 'Semua'
    ? faq
    : faq.filter(item => item.kategori === kategoriAktif)

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">❓ FAQ</h1>
        <p className="text-gray-500">Pertanyaan yang sering ditanyakan</p>
        <div className="w-16 h-1 bg-blue-600 mt-3 rounded mx-auto"></div>
      </div>

      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      )}

      {!loading && (
        <>
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {kategoriList.map(kat => (
              <button
                key={kat}
                onClick={() => setKategoriAktif(kat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  kategoriAktif === kat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {kat}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {faqFiltered.map(item => (
              <Accordion key={item.id} pertanyaan={item.pertanyaan} jawaban={item.jawaban} />
            ))}
          </div>
          {faqFiltered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🤔</p>
              <p>Tidak ada FAQ untuk kategori ini</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default FAQ