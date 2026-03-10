import { useState } from 'react'
import PendaftaranContext from './PendaftaranContext'

const PendaftaranProvider = ({ children }) => {
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

export default PendaftaranProvider