// src/components/dokter/DokterFilter.jsx
const DokterFilter = ({ keyword, poliklinikId, polikliniks, onKeywordChange, onPoliklinikChange, onReset }) => (
  <div className="bg-white rounded-2xl shadow p-6 mb-6">
    <h5 className="font-semibold text-gray-700 mb-1">Cari Jadwal Dokter</h5>
    <p className="text-sm text-gray-400 mb-4">Temukan jadwal praktik dokter berdasarkan nama atau poliklinik</p>
    <div className="flex flex-col md:flex-row gap-3">
      <input
        type="search"
        value={keyword}
        onChange={e => onKeywordChange(e.target.value)}
        placeholder="Nama dokter, contoh: Ahmad"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={poliklinikId}
        onChange={e => onPoliklinikChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Semua Poliklinik</option>
        {polikliniks.map(p => (
          <option key={p.id} value={p.id}>{p.nm_poli}</option>
        ))}
      </select>
      <button
        onClick={onReset}
        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition"
      >
        Reset
      </button>
    </div>
  </div>
)

export default DokterFilter