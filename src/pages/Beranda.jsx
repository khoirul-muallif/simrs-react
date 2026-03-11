import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaAmbulance, FaUserMd, FaXRay, FaFlask, FaBaby, FaHeartbeat, FaArrowRight, FaPhone } from 'react-icons/fa'
import { getBeranda } from '../services/api'
import BlogCard from '../components/blog/BlogCard'
import Spinner from '../components/ui/Spinner'
import { getImageUrl } from '../utils/formatImage'

const iconMap = {
  FaAmbulance: <FaAmbulance />, FaUserMd: <FaUserMd />, FaXRay: <FaXRay />,
  FaFlask: <FaFlask />, FaBaby: <FaBaby />, FaHeartbeat: <FaHeartbeat />,
}

const Beranda = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBeranda()
      .then(res => { setData(res.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <Spinner className="min-h-screen" />

  return (
    <div>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `linear-gradient(rgba(0,51,102,0.75), rgba(0,51,102,0.75)), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600')` }}>
        <div className="text-center text-white px-6 max-w-4xl mx-auto">
          <span className="inline-block bg-white/20 backdrop-blur text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            🏥 Rumah Sakit Terpercaya di Semarang
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Kesehatan Anda <span className="text-blue-300"> Prioritas </span> Kami
          </h1>
          <p className="text-blue-100 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            RS Sehat Sejahtera hadir dengan fasilitas modern dan tenaga medis berpengalaman
            untuk memberikan pelayanan terbaik bagi Anda dan keluarga.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pendaftaran" className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-xl transition text-lg">
              📋 Daftar Sekarang
            </Link>
            <Link to="/dokter" className="bg-white/20 hover:bg-white/30 backdrop-blur text-white font-bold px-8 py-4 rounded-xl transition text-lg border border-white/30">
              🩺 Lihat Dokter
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto">
            {[
              { angka: '50+', label: 'Dokter Spesialis' },
              { angka: '24/7', label: 'Layanan IGD' },
              { angka: '10K+', label: 'Pasien Dilayani' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-white">{stat.angka}</p>
                <p className="text-blue-200 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/70 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* LAYANAN */}
      {data?.layanan?.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Apa Yang Kami Tawarkan</span>
              <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-4">Layanan Unggulan</h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Kami menyediakan berbagai layanan medis berkualitas tinggi dengan didukung peralatan modern.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.layanan.map(item => (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-200 transition group">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                    {iconMap[item.icon] ?? <FaHeartbeat />}
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mb-2">{item.nama}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.deskripsi}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DOKTER FEATURED */}
      {data?.dokters?.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Tim Medis Kami</span>
                <h2 className="text-3xl font-bold text-gray-800 mt-2">Dokter Spesialis</h2>
              </div>
              <Link to="/dokter" className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:underline">
                Lihat Semua <FaArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.dokters.map(d => (
                <div key={d.id} className="bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition p-6 flex flex-col items-center text-center">
                  {getImageUrl(d.image)
                    ? <img src={getImageUrl(d.image)} alt={d.nm_dokter} className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 mb-4" />
                    : <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold mb-4">{d.nm_dokter?.[0]}</div>
                  }
                  <h3 className="font-bold text-gray-800 mb-1">{d.nm_dokter}</h3>
                  <span className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-2">{d.spesialis?.nm_sps}</span>
                  <p className="text-sm text-gray-500">🏥 {d.poliklinik?.nm_poli}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8 md:hidden">
              <Link to="/dokter" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline">
                Lihat Semua Dokter <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* BLOG TERBARU */}
      {data?.posts?.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Edukasi Kesehatan</span>
                <h2 className="text-3xl font-bold text-gray-800 mt-2">Artikel Terbaru</h2>
              </div>
              <Link to="/blog" className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:underline">
                Lihat Semua <FaArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.posts.map(item => <BlogCard key={item.id} item={item} />)}
            </div>
            <div className="text-center mt-8 md:hidden">
              <Link to="/blog" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline">
                Lihat Semua Artikel <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-blue-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Siap Untuk Berobat?</h2>
          <p className="text-blue-200 text-lg mb-8">
            Daftarkan diri Anda sekarang dan dapatkan pelayanan terbaik dari tim medis kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pendaftaran" className="bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition text-lg">
              📋 Daftar Sekarang
            </Link>
            <a href="tel:02911234567" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl border border-blue-500 transition text-lg">
              <FaPhone /> Hubungi Kami
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Beranda