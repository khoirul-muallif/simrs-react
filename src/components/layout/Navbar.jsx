import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaHospital, FaBars, FaTimes, FaPhone, FaClock, FaChevronDown } from 'react-icons/fa'

const DropdownItem = ({ to, children }) => (
  <NavLink to={to}
    className={({ isActive }) =>
      `block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 transition ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}`
    }>
    {children}
  </NavLink>
)

const Dropdown = ({ label, children }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition py-1">
        {label} <FaChevronDown className="text-xs" />
      </button>
      {open && (
        <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg border border-gray-100 min-w-48 z-50 py-1">
          {children}
        </div>
      )}
    </div>
  )
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileDropdown, setMobileDropdown] = useState(null)

  const toggleMobileDropdown = (key) =>
    setMobileDropdown(prev => prev === key ? null : key)

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

          <li>
            <NavLink to="/" end
              className={({ isActive }) =>
                `text-sm font-medium transition hover:text-blue-600 ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-600'}`
              }>
              Beranda
            </NavLink>
          </li>

          <li>
            <Dropdown label="Profil">
              <DropdownItem to="/profil">Profil RS</DropdownItem>
              <DropdownItem to="/visi-misi">Visi & Misi</DropdownItem>
              <DropdownItem to="/indikator-mutu">Indikator Mutu</DropdownItem>
            </Dropdown>
          </li>

          <li>
            <Dropdown label="Informasi">
              <DropdownItem to="/pelayanan/rawat-inap">Kamar Rawat Inap</DropdownItem>
              <DropdownItem to="/pelayanan/home-care">Home Care</DropdownItem>
              <DropdownItem to="/pelayanan/paket-kesehatan">Paket Kesehatan</DropdownItem>
              <DropdownItem to="/ambulan">Ambulan 24 Jam</DropdownItem>
            </Dropdown>
          </li>

          <li>
            <NavLink to="/dokter"
              className={({ isActive }) =>
                `text-sm font-medium transition hover:text-blue-600 ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-600'}`
              }>
              Jadwal Dokter
            </NavLink>
          </li>

          <li>
            <Dropdown label="Gallery">
              <DropdownItem to="/gallery">Semua Konten</DropdownItem>
              <DropdownItem to="/gallery?type=youtube">YouTube</DropdownItem>
              <DropdownItem to="/gallery?type=instagram">Instagram</DropdownItem>
              <DropdownItem to="/gallery?type=image">Gambar</DropdownItem>
            </Dropdown>
          </li>

          <li>
            <NavLink to="/blog"
              className={({ isActive }) =>
                `text-sm font-medium transition hover:text-blue-600 ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-600'}`
              }>
              Blog
            </NavLink>
          </li>

        </ul>

        {/* Desktop Button */}
        <a href="https://perjanjian.rsubanyumanik2.com/"
          target="_blank" rel="noreferrer"
          className="hidden md:block bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-5 py-2 rounded-full transition">
          📋 Pendaftaran Online
        </a>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-gray-600 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-2">

          <NavLink to="/" end onClick={() => setMenuOpen(false)}
            className={({ isActive }) => `text-sm font-medium py-2 ${isActive ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>
            Beranda
          </NavLink>

          {/* Mobile Dropdown — Profil */}
          <div>
            <button onClick={() => toggleMobileDropdown('profil')}
              className="w-full flex justify-between items-center text-sm font-medium text-gray-600 py-2">
              Profil <FaChevronDown className={`text-xs transition ${mobileDropdown === 'profil' ? 'rotate-180' : ''}`} />
            </button>
            {mobileDropdown === 'profil' && (
              <div className="pl-4 flex flex-col gap-1 border-l-2 border-blue-100 ml-2 mb-2">
                {[['Profil RS', '/profil'], ['Visi & Misi', '/visi-misi'], ['Indikator Mutu', '/indikator-mutu']].map(([label, path]) => (
                  <NavLink key={path} to={path} onClick={() => setMenuOpen(false)}
                    className="text-sm text-gray-500 py-1 hover:text-blue-600">{label}</NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Dropdown — Informasi */}
          <div>
            <button onClick={() => toggleMobileDropdown('informasi')}
              className="w-full flex justify-between items-center text-sm font-medium text-gray-600 py-2">
              Informasi <FaChevronDown className={`text-xs transition ${mobileDropdown === 'informasi' ? 'rotate-180' : ''}`} />
            </button>
            {mobileDropdown === 'informasi' && (
              <div className="pl-4 flex flex-col gap-1 border-l-2 border-blue-100 ml-2 mb-2">
                {[
                  ['Kamar Rawat Inap', '/pelayanan/rawat-inap'],
                  ['Home Care', '/pelayanan/home-care'],
                  ['Paket Kesehatan', '/pelayanan/paket-kesehatan'],
                  ['Ambulan 24 Jam', '/ambulan'],
                ].map(([label, path]) => (
                  <NavLink key={path} to={path} onClick={() => setMenuOpen(false)}
                    className="text-sm text-gray-500 py-1 hover:text-blue-600">{label}</NavLink>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/dokter" onClick={() => setMenuOpen(false)}
            className={({ isActive }) => `text-sm font-medium py-2 ${isActive ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>
            Jadwal Dokter
          </NavLink>

          <NavLink to="/blog" onClick={() => setMenuOpen(false)}
            className={({ isActive }) => `text-sm font-medium py-2 ${isActive ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>
            Blog
          </NavLink>

          <NavLink to="/gallery" onClick={() => setMenuOpen(false)}
            className={({ isActive }) => `text-sm font-medium py-2 ${isActive ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>
            Gallery
          </NavLink>

          <a href="https://perjanjian.rsubanyumanik2.com/" target="_blank" rel="noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-2 bg-green-500 text-white text-sm text-center font-semibold px-5 py-2 rounded-full">
            📋 Pendaftaran Online
          </a>
        </div>
      )}

    </header>
  )
}

export default Navbar