// src/components/dokter/DokterCard.jsx
import { useNavigate } from 'react-router-dom'
import DokterAvatar from './DokterAvatar'
import JadwalTable from './JadwalTable'

const DokterCard = ({ dokter: d }) => {
  const navigate = useNavigate()

  const handlePilihDokter = () => {
    navigate('/pendaftaran', {
      state: { dokter_id: d.id, poliklinik_id: d.poliklinik?.id }
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow mb-6 p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-48 flex flex-col items-center lg:items-start text-center lg:text-left">
          <DokterAvatar nama={d.nm_dokter} image={d.image} />
          <h5 className="font-semibold text-gray-800 mb-1">{d.nm_dokter}</h5>
          <p className="text-sm text-gray-500"><span className="font-medium">Spesialis:</span> {d.spesialis?.nm_sps ?? '-'}</p>
          <p className="text-sm text-gray-500"><span className="font-medium">Poliklinik:</span> {d.poliklinik?.nm_poli ?? '-'}</p>
          <p className="text-sm text-gray-500"><span className="font-medium">Jenis Kelamin:</span> {d.jk === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
          <p className="text-sm mt-1">
            <span className="font-medium">Status: </span>
            {d.status
              ? <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Aktif</span>
              : <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">Non-Aktif</span>
            }
          </p>
          <button
            onClick={handlePilihDokter}
            className="mt-4 px-4 py-2 border border-green-500 text-green-600 text-sm rounded-lg hover:bg-green-50 transition"
          >
            Daftar ke Dokter Ini
          </button>
        </div>

        <div className="flex-1">
          <JadwalTable jadwal={d.jadwal} />
        </div>
      </div>
    </div>
  )
}

export default DokterCard