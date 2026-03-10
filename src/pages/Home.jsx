import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaAmbulance, FaUserMd, FaXRay, FaFlask,
  FaBaby, FaHeartbeat, FaArrowRight, FaPhone
} from 'react-icons/fa'
import dataDokter from '../data/dokter.json'
import dataPengumuman from '../data/pengumuman.json'
import dataBlog from '../data/blog.json'
import dataLayanan from '../data/layanan.json'

// Map icon string ke komponen react-icons
const iconMap = {
  FaAmbulance: <FaAmbulance />,
  FaUserMd: <FaUserMd />,
  FaXRay: <FaXRay />,
  FaFlask: <FaFlask />,
  FaBaby: <FaBaby />,
  FaHeartbeat: <FaHeartbeat />,
}

const formatTanggal = (tgl) =>
  new Date(tgl).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

const Home = () => {
  const [dokterFeatured] = useState(dataDokter.slice(0, 3))
  const [pengumumanTerbaru] = useState(dataPengumuman.slice(0, 3))
  const [blogTerbaru] = useState(dataBlog.slice(0, 3))

  return (
    <div>

      {/* ==============================
          1. HERO SECTION
      ============================== */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,51,102,0.75), rgba(0,51,102,0.75)),
          url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600')`
        }}
      >
        <div className="text-center text-white px-6 max-w-4xl mx-auto">
          {/* Badge */}
          <span className="inline-block bg-white/20 backdrop-blur text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            🏥 Rumah Sakit Terpercaya di Semarang
          </span>

          {/* Judul */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Kesehatan Anda
            <span className="text-blue-300"> Prioritas </span>
            Kami
          </h1>

          {/* Deskripsi */}
          <p className="text-blue-100 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            RS Sehat Sejahtera hadir dengan fasilitas modern dan tenaga medis
            berpengalaman untuk memberikan pelayanan terbaik bagi Anda dan keluarga.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pendaftaran"
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-xl transition text-lg"
            >
              📋 Daftar Sekarang
            </Link>
            <Link
              to="/dokter"
              className="bg-white/20 hover:bg-white/30 backdrop-blur text-white font-bold px-8 py-4 rounded-xl transition text-lg border border-white/30"
            >
              🩺 Lihat Dokter
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto">
            {[
              { angka: '50+', label: 'Dokter Spesialis' },
              { angka: '24/7', label: 'Layanan IGD' },
              { angka: '10K+', label: 'Pasien Dilayani' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-white">{stat.angka}</p>
                <p className="text-blue-200 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/70 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* ==============================
          2. LAYANAN UNGGULAN
      ============================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header Section */}
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              Apa Yang Kami Tawarkan
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-4">
              Layanan Unggulan
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Kami menyediakan berbagai layanan medis berkualitas tinggi
              dengan didukung peralatan modern dan tenaga ahli berpengalaman.
            </p>
          </div>

          {/* Grid Layanan */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataLayanan.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-200 transition group"
              >
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                  {iconMap[item.icon]}
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{item.nama}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.deskripsi}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==============================
          3. DOKTER FEATURED
      ============================== */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
                Tim Medis Kami
              </span>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                Dokter Spesialis
              </h2>
            </div>
            <Link
              to="/dokter"
              className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:underline"
            >
              Lihat Semua <FaArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dokterFeatured.map((d) => (
              <Link
                key={d.id}
                to={`/dokter/${d.id}`}
                className="bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition group p-6 flex flex-col items-center text-center"
              >
                <img
                  src={d.image}
                  alt={d.nm_dokter}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 mb-4"
                />
                <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition mb-1">
                  {d.nm_dokter}
                </h3>
                <span className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-2">
                  {d.spesialis.nm_sps}
                </span>
                <p className="text-sm text-gray-500">🏥 {d.poliklinik.nm_poli}</p>
                <div className="flex flex-wrap gap-1 justify-center mt-3">
                  {d.jadwal.map((j) => (
                    <span key={j.id} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                      {j.hari}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile — tombol lihat semua */}
          <div className="text-center mt-8 md:hidden">
            <Link
              to="/dokter"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
            >
              Lihat Semua Dokter <FaArrowRight />
            </Link>
          </div>

        </div>
      </section>

      {/* ==============================
          4. PENGUMUMAN TERBARU
      ============================== */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6">

          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
                Info Terkini
              </span>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                Pengumuman Terbaru
              </h2>
            </div>
            <Link
              to="/pengumuman"
              className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:underline"
            >
              Lihat Semua <FaArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pengumumanTerbaru.map((item) => (
              <Link
                key={item.id}
                to={`/pengumuman/${item.slug}`}
                className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-md transition group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {item.kategori}
                  </span>
                  {item.penting && (
                    <span className="text-xs font-semibold bg-red-100 text-red-600 px-3 py-1 rounded-full">
                      🔴 Penting
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition leading-snug mb-2">
                  {item.judul}
                </h3>
                <p className="text-xs text-gray-400 mb-2">📅 {formatTanggal(item.tanggal)}</p>
                <p className="text-gray-500 text-sm line-clamp-2">{item.ringkasan}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link to="/pengumuman" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline">
              Lihat Semua <FaArrowRight />
            </Link>
          </div>

        </div>
      </section>

      {/* ==============================
          5. BLOG TERBARU
      ============================== */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
                Edukasi Kesehatan
              </span>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                Artikel Terbaru
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:underline"
            >
              Lihat Semua <FaArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogTerbaru.map((item) => (
              <Link
                key={item.id}
                to={`/blog/${item.slug}`}
                className="bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition group overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition leading-snug mt-3 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2">
                    ✍️ {item.author} · 📅 {formatTanggal(item.published_at)}
                  </p>
                  <p className="text-gray-500 text-sm line-clamp-2">{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link to="/blog" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline">
              Lihat Semua Artikel <FaArrowRight />
            </Link>
          </div>

        </div>
      </section>

      <section className="py-20 bg-blue-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Untuk Berobat?
          </h2>
          <p className="text-blue-200 text-lg mb-8">
            Daftarkan diri Anda sekarang dan dapatkan pelayanan terbaik dari tim medis kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pendaftaran"
              className="bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition text-lg"
            >
              📋 Daftar Sekarang
            </Link>
            <a
              href="tel:02911234567"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl border border-blue-500 transition text-lg"
            >
              <FaPhone /> Hubungi Kami
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
