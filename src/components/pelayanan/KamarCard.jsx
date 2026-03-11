import { getImageUrl } from '../../utils/formatImage'

const KamarCard = ({ kamar }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all">
    <div className="relative overflow-hidden">
      {getImageUrl(kamar.gambar)
        ? <img src={getImageUrl(kamar.gambar)} alt={kamar.nama_kamar}
            className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300" />
        : <div className="w-full h-52 bg-gray-100 flex items-center justify-center text-gray-400 text-4xl">🛏</div>
      }
      <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
        {kamar.kelas?.nama}
      </span>
    </div>
    <div className="p-4">
      <h5 className="font-bold text-gray-800 mb-2">{kamar.nama_kamar}</h5>
      {kamar.deskripsi && (
        <p className="text-sm text-gray-500 mb-3 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: kamar.deskripsi }} />
      )}
      {kamar.kelas?.fasilitas && (
        <div className="mb-3">
          <p className="text-sm font-semibold text-green-600 mb-1">✅ Fasilitas:</p>
          <div className="text-sm text-gray-500 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: kamar.kelas.fasilitas }} />
        </div>
      )}
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <span className="text-sm text-gray-400">Harga per malam:</span>
        <span className="font-bold text-green-600 text-lg">
          Rp {Number(kamar.harga).toLocaleString('id-ID')}
        </span>
      </div>
    </div>
  </div>
)

export default KamarCard