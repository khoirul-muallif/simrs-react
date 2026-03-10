export const formatTanggal = (tgl) =>
  new Date(tgl).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })

export const formatTanggalPanjang = (tgl) =>
  new Date(tgl).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

export const isToday = (tgl) =>
  new Date(tgl).toDateString() === new Date().toDateString()