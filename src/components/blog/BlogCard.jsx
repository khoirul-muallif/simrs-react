import { Link } from 'react-router-dom'
import { getImageUrl } from '../../utils/formatImage'
import { formatTanggal } from '../../utils/formatDate'

const BlogCard = ({ item }) => (
  <Link to={`/blog/${item.slug}`}
    className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">
    <img
      src={getImageUrl(item.image) ?? '/placeholder.jpg'}
      alt={item.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-4 flex flex-col gap-2 flex-1">
      {item.category?.name && (
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full w-fit">
          {item.category.name}
        </span>
      )}
      <h3 className="font-bold text-gray-800 leading-snug">{item.title}</h3>
      <p className="text-xs text-gray-400">{formatTanggal(item.published_at ?? item.created_at)}</p>
      {item.excerpt && (
        <p className="text-sm text-gray-500 line-clamp-3">{item.excerpt}</p>
      )}
    </div>
  </Link>
)

export default BlogCard