import { useState } from 'react'
import { getImageUrl } from '../../utils/formatImage'

const PaketAccordion = ({ layanan }) => {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="flex flex-col gap-3">
      {layanan.map((paket, idx) => (
        <div key={paket.id} className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
            className="w-full flex justify-between items-center px-5 py-4 font-semibold text-gray-700 hover:bg-gray-50 transition text-left">
            {paket.nama_paket?.toUpperCase()}
            <span>{openIndex === idx ? '▲' : '▼'}</span>
          </button>

          {openIndex === idx && (
            <div className="px-5 py-4 border-t border-gray-100">
              {getImageUrl(paket.gambar) && (
                <div className="mb-4">
                  <img src={getImageUrl(paket.gambar)} alt={paket.nama_paket}
                    className="w-full max-h-96 object-cover rounded-xl shadow" />
                </div>
              )}
              {paket.kategori && (
                <p className="text-sm text-gray-600 mb-2"><strong>Kategori:</strong> {paket.kategori}</p>
              )}
              {paket.deskripsi && (
                <div className="prose prose-sm max-w-none text-gray-600 mb-4"
                  dangerouslySetInnerHTML={{ __html: paket.deskripsi }} />
              )}
              {paket.sub_layanan?.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700">
                        <th className="text-left px-4 py-3 font-semibold">Nama Layanan</th>
                        <th className="text-left px-4 py-3 font-semibold">Fasilitas & Service</th>
                        <th className="text-right px-4 py-3 font-semibold">Pesan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paket.sub_layanan.map((sub, i) => (
                        <tr key={sub.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 text-gray-800">{sub.nama_sub_layanan}</td>
                          <td className="px-4 py-3 text-gray-600 prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: sub.deskripsi }} />
                          <td className="px-4 py-3 text-right">
                            {sub.wa_url && (
                              <a href={sub.wa_url} target="_blank" rel="noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1 border border-green-500 text-green-600 rounded-full text-xs hover:bg-green-50 transition">
                                💬 Hubungi {paket.wa_department}
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default PaketAccordion