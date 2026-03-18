import useIndikatorMutu from '../hooks/useIndikatorMutu'
import PageLayout from '../components/layout/PageLayout'
import { getImageUrl } from '../utils/formatImage'
import { formatTanggal } from '../utils/formatDate'

const IndikatorMutu = () => {
  const { section, periodes, loading } = useIndikatorMutu()

  return (
    <PageLayout section={section} loading={loading}>

      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-800 uppercase mb-2">Indikator Mutu</h2>
        <div className="mx-auto w-20 h-1 bg-blue-600 rounded"></div>
      </div>

      {periodes.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">📊</p>
          <p>Data indikator mutu belum tersedia</p>
        </div>
      )}

      <div className="flex flex-col gap-10">
        {periodes.map(periode => (
          <div key={periode.id}>

            {/* Header Periode */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-blue-600 rounded"></div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{periode.nama}</h3>
                {periode.mulai && periode.selesai && (
                  <p className="text-sm text-gray-400">
                    {formatTanggal(periode.mulai)} – {formatTanggal(periode.selesai)}
                  </p>
                )}
              </div>
            </div>

            {/* Grid Indikator */}
            {periode.indikators?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {periode.indikators.map(item => (
                  <div key={item.id}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    {item.judul && (
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                        <h4 className="font-semibold text-gray-700 text-sm">{item.judul}</h4>
                      </div>
                    )}
                    {getImageUrl(item.image) ? (
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.judul}
                        className="w-full object-contain p-2"
                      />
                    ) : (
                      <div className="p-8 text-center text-gray-300">
                        <p className="text-4xl">📈</p>
                        <p className="text-sm mt-2">Grafik belum tersedia</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">Belum ada data untuk periode ini</p>
            )}

          </div>
        ))}
      </div>

    </PageLayout>
  )
}

export default IndikatorMutu