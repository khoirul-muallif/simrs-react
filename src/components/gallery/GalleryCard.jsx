const typeBadgeColor = {
  youtube:   'bg-red-500',
  instagram: 'bg-pink-500',
  tiktok:    'bg-gray-900',
  facebook:  'bg-blue-600',
  image:     'bg-green-500',
}

const isPortrait = (type) => ['instagram', 'tiktok'].includes(type)

const GalleryCard = ({ item }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all">
    <div className={`relative overflow-hidden ${isPortrait(item.type) ? 'aspect-9/16 max-h-96' : 'aspect-video'}`}
      dangerouslySetInnerHTML={{ __html: item.embed_code }} />
    <div className="p-4">
      <h5 className="font-semibold text-gray-800 mb-2 line-clamp-2">{item.title}</h5>
      {item.description && (
        <p className="text-sm text-gray-500 mb-3 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: item.description }} />
      )}
      <span className={`text-xs text-white px-3 py-1 rounded-full ${typeBadgeColor[item.type] ?? 'bg-gray-400'}`}>
        {item.type?.charAt(0).toUpperCase() + item.type?.slice(1)}
      </span>
    </div>
  </div>
)

export default GalleryCard