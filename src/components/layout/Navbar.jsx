import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  FaHospital,
  FaBars,
  FaTimes,
  FaPhone,
  FaClock
} from 'react-icons/fa'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { label: 'Beranda', path: '/' },
    { label: 'Dokter & Jadwal', path: '/dokter' },
    { label: 'Pendaftaran', path: '/pendaftaran' },
    { label: 'Blog', path: '/blog' },
   
  
    { label: 'Kontak', path: '/contact' }
  ]

  return (
    <header className="w-full shadow-md sticky top-0 z-50 bg-white">

      {/* Top Bar */}
      <div className="bg-blue-700 text-white text-sm px-6 py-2">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaPhone className="text-xs" />
            <span>(0291) 123-4567</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-xs" />
            <span>IGD 24 Jam</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <FaHospital className="text-blue-600 text-3xl" />
          <div>
            <p className="text-blue-700 font-bold text-lg leading-tight">RSU Banyumanik 2</p>
            <p className="text-gray-400 text-xs">Semarang</p>
          </div>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `text-sm font-medium transition hover:text-blue-600 ${
                    isActive
                      ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                      : 'text-gray-600'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Button */}
        <NavLink
          to="/login"
          className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition"
        >
          Masuk / Daftar
        </NavLink>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-600 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-sm font-medium transition hover:text-blue-600 ${
                  isActive ? 'text-blue-600 font-bold' : 'text-gray-600'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="bg-blue-600 text-white text-sm text-center font-semibold px-5 py-2 rounded-lg"
          >
            Masuk / Daftar
          </NavLink>
        </div>
      )}

    </header>
  )
}

export default Navbar