import { Link } from 'react-router-dom'
import {
  FaHospital,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaClock
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white mt-20">

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Kolom 1 - Info RS */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <FaHospital className="text-3xl text-green-300" />
            <div>
              <p className="font-bold text-lg leading-tight">RS Sehat Sejahtera</p>
              <p className="text-green-300 text-xs">Melayani Dengan Sepenuh Hati</p>
            </div>
          </div>
          <p className="text-green-200 text-sm leading-relaxed">
            Rumah sakit terpercaya dengan fasilitas modern dan tenaga medis berpengalaman untuk kesehatan keluarga Anda.
          </p>
          {/* Social Media */}
          <div className="flex gap-4 mt-2">
            <a href="#" className="text-green-300 hover:text-white text-xl transition">
              <FaFacebook />
            </a>
            <a href="#" className="text-green-300 hover:text-white text-xl transition">
              <FaInstagram />
            </a>
            <a href="#" className="text-green-300 hover:text-white text-xl transition">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Kolom 2 - Link Cepat */}
        <div>
          <h4 className="font-bold text-lg mb-4 border-b border-green-700 pb-2">
            Link Cepat
          </h4>
          <ul className="flex flex-col gap-2">
            {[
              { label: 'Beranda', path: '/' },
              { label: 'Dokter & Jadwal', path: '/dokter' },
              { label: 'Pendaftaran Online', path: '/pendaftaran' },
              { label: 'Blog Kesehatan', path: '/blog' },
              { label: 'Pengumuman', path: '/pengumuman' },
              { label: 'FAQ', path: '/faq' },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-green-200 hover:text-white text-sm transition"
                >
                  → {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3 - Jam Operasional */}
        <div>
          <h4 className="font-bold text-lg mb-4 border-b border-green-700 pb-2">
            Jam Operasional
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-green-200">
            <li className="flex items-start gap-2">
              <FaClock className="mt-1 text-green-300 shrink-0" />
              <div>
                <p className="font-medium text-white">Poli Umum</p>
                <p>Senin - Sabtu: 07.00 - 21.00</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <FaClock className="mt-1 text-green-300 shrink-0" />
              <div>
                <p className="font-medium text-white">Poli Spesialis</p>
                <p>Senin - Jumat: 08.00 - 16.00</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <FaClock className="mt-1 text-green-300 shrink-0" />
              <div>
                <p className="font-medium text-white">IGD</p>
                <p>24 Jam / 7 Hari</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Kolom 4 - Kontak */}
        <div>
          <h4 className="font-bold text-lg mb-4 border-b border-green-700 pb-2">
            Hubungi Kami
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-green-200">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1 text-green-300 shrink-0" />
              <span>Jl. Kesehatan No. 1, Kota Sehat, Jawa Tengah 12345</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="text-green-300 shrink-0" />
              <span>(0291) 123-4567</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-green-300 shrink-0" />
              <span>info@rssehat.co.id</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-800 py-4 text-center text-green-300 text-sm">
        © {new Date().getFullYear()} RS Sehat Sejahtera. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer