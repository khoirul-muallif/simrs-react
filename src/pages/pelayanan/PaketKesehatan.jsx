import usePageSection from '../../hooks/usePageSection'
import usePaketKesehatan from '../../hooks/usePaketKesehatan'
import PageLayout from '../../components/layout/PageLayout'
import PaketAccordion from '../../components/pelayanan/PaketAccordion'
import Pagination from '../../components/ui/Pagination'
import Spinner from '../../components/ui/Spinner'

const PaketKesehatan = () => {
  const { section, loading: sectionLoading } = usePageSection('paket-kesehatan')
  const {
    layanan, paketList, meta, selectPaket, search,
    searchInput, setSearchInput, page, loading,
    handleSelectPaket, handleSearch, handlePageChange
  } = usePaketKesehatan()

  return (
    <PageLayout section={section} loading={sectionLoading}>

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 uppercase mb-2">Paket Kesehatan</h3>
        <div className="mx-auto w-20 h-1 bg-green-500 rounded"></div>
      </div>

      {/* Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <select value={selectPaket} onChange={handleSelectPaket}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">-- Pilih Paket --</option>
          {paketList.map(p => <option key={p.id} value={p.id}>{p.nama_paket}</option>)}
        </select>

        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <input type="text" value={searchInput} onChange={e => setSearchInput(e.target.value)}
            placeholder="Cari nama paket..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
          <button type="submit"
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition font-semibold">
            Cari
          </button>
        </form>
      </div>

      {meta && (
        <p className="text-sm text-gray-400 mb-6">
          {search ? `Ditemukan ${meta.total} paket untuk: "${search}"` : `Total tersedia ${meta.total} paket kesehatan`}
        </p>
      )}

      {loading ? <Spinner /> : (
        <>
          {layanan.length > 0
            ? <PaketAccordion layanan={layanan} />
            : (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">📦</p>
                <p>Data paket kesehatan tidak ditemukan</p>
              </div>
            )
          }
          {meta && meta.last_page > 1 && (
            <Pagination meta={meta} page={page} onPageChange={handlePageChange} />
          )}
        </>
      )}
    </PageLayout>
  )
}

export default PaketKesehatan
