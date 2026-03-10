import { useContext } from 'react'
import PendaftaranContext from '../context/PendaftaranContext'

const usePendaftaran = () => {
  const ctx = useContext(PendaftaranContext)
  if (!ctx) throw new Error('usePendaftaran harus dipakai di dalam PendaftaranProvider')
  return ctx
}

export default usePendaftaran