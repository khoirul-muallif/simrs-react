const Pagination = ({ meta, page, onPageChange }) => (
  <div className="flex justify-between items-center mt-6 text-sm text-gray-500 flex-wrap gap-3">
    <p>Menampilkan {meta.from}–{meta.to} dari {meta.total} data</p>
    <div className="flex gap-2 flex-wrap">
      {Array.from({ length: meta.last_page }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded-lg border transition ${
            page === p
              ? 'bg-blue-600 text-white border-blue-600'
              : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  </div>
)

export default Pagination