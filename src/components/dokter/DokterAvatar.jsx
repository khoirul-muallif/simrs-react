// src/components/dokter/DokterAvatar.jsx
const getDokterImage = (image) => {
  if (!image) return null
  if (image.startsWith('http')) return image
  return `${import.meta.env.VITE_STORAGE_URL}/${image}`
}

const DokterAvatar = ({ nama, image }) => {
  const src = getDokterImage(image)
  return src ? (
    <img src={src} alt={nama}
      className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 mb-3" />
  ) : (
    <div className="w-24 h-24 rounded-full bg-gray-400 text-white flex items-center justify-center text-3xl font-bold mb-3">
      {nama?.charAt(0).toUpperCase()}
    </div>
  )
}

export default DokterAvatar