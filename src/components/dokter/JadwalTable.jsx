// src/components/dokter/JadwalTable.jsx
const hariMap = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

const sortJadwal = (jadwal) =>
  [...jadwal].sort((a, b) => {
    if (a.tanggal && b.tanggal) return new Date(a.tanggal) - new Date(b.tanggal)
    if (a.tanggal) return -1
    if (b.tanggal) return 1
    return hariMap.indexOf(a.hari) - hariMap.indexOf(b.hari)
  })

const formatTanggal = (tgl) =>
  new Date(tgl).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })

const isToday = (tgl) =>
  new Date(tgl).toDateString() === new Date().toDateString()

const JadwalTable = ({ jadwal }) => {
  if (!jadwal?.length) return (
    <div className="bg-yellow-50 text-yellow-700 text-sm px-4 py-3 rounded-lg">
      Tidak ada jadwal tersedia untuk filter yang dipilih.
    </div>
  )

  return (
    <>
      <p className="font-semibold text-gray-700 mb-3">Jadwal Tersedia:</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-gray-600 text-center">
            <tr>
              {['Hari', 'Tanggal', 'Mulai', 'Selesai', 'Keterangan'].map(h => (
                <th key={h} className="px-3 py-2 border-b">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortJadwal(jadwal).map(j => (
              <tr key={j.id} className="text-center border-b last:border-0 hover:bg-gray-50">
                <td className="px-3 py-2">{j.hari ?? '-'}</td>
                <td className="px-3 py-2">
                  {j.tanggal ? (
                    <>
                      {formatTanggal(j.tanggal)}
                      {isToday(j.tanggal) && (
                        <span className="ml-1 bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full">Hari Ini</span>
                      )}
                    </>
                  ) : '-'}
                </td>
                <td className="px-3 py-2">{j.jam_mulai?.slice(0, 5) ?? '-'}</td>
                <td className="px-3 py-2">{j.jam_selesai?.slice(0, 5) ?? '-'}</td>
                <td className="px-3 py-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    j.keterangan === 'Cuti' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'
                  }`}>
                    {j.keterangan ?? '-'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default JadwalTable