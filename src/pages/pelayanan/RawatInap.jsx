import usePageSection from '../../hooks/usePageSection'
import useRawatInap from '../../hooks/useRawatInap'
import PageLayout from '../../components/layout/PageLayout'
import KamarCard from '../../components/pelayanan/KamarCard'
import Spinner from '../../components/ui/Spinner'
import Pagination from '../../components/ui/Pagination'

const RawatInap = () => {
  const { section, loading: sectionLoading } = usePageSection('rawat-inap')
  const { kamarList, daftarKelas, meta, kelasId, page, loading, handleKelasChange, handlePageChange } = useRawatInap()

  return (
    <PageLayout section={section} loading={sectionLoading}>

      {/* YouTube */}
      <div className="my-8 rounded-xl overflow-hidden shadow aspect-video">
        <iframe src="https://www.youtube-nocookie.com/embed/XQfypcpF-2I"
          title="Video Fasilitas Rawat Inap" allowFullScreen className="w-full h-full" />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 uppercase mb-2">Informasi Kamar</h3>
        <div className="mx-auto w-20 h-1 bg-green-500 rounded"></div>
      </div>

      {/* Filter */}
      <div className="flex justify-center mb-6">
        <select value={kelasId} onChange={handleKelasChange}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">-- Semua Kelas --</option>
          {daftarKelas.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
        </select>
      </div>

      {meta && (
        <p className="text-sm text-gray-400 text-center mb-6">
          {kelasId
            ? `Menampilkan kamar kelas: ${daftarKelas.find(k => k.id == kelasId)?.nama}`
            : `Total tersedia ${meta.total} kamar rawat inap`}
        </p>
      )}

      {loading && <Spinner />}

      {!loading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kamarList.map(kamar => <KamarCard key={kamar.id} kamar={kamar} />)}
          </div>

          {kamarList.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🛏</p>
              <p>Tidak ada kamar yang ditemukan</p>
            </div>
          )}

          {meta && meta.last_page > 1 && (
            <Pagination meta={meta} page={page} onPageChange={handlePageChange} />
          )}
        </>
      )}
    </PageLayout>
  )
}

export default RawatInap