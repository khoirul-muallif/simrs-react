import { createContext, useContext, useState } from 'react'

const PendaftaranContext = createContext(null)

export const PendaftaranProvider = ({ children }) => {
  const [dataPasien, setDataPasien] = useState(null)
  const [dataPendaftaran, setDataPendaftaran] = useState(null)

  const reset = () => {
    setDataPasien(null)
    setDataPendaftaran(null)
  }

  return (
    <PendaftaranContext.Provider value={{ dataPasien, setDataPasien, dataPendaftaran, setDataPendaftaran, reset }}>
      {children}
    </PendaftaranContext.Provider>
  )
}

export const usePendaftaran = () => {
  const ctx = useContext(PendaftaranContext)
  if (!ctx) throw new Error('usePendaftaran harus dipakai di dalam PendaftaranProvider')
  return ctx
}

export default PendaftaranContext