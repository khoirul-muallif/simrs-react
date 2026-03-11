import { getImageUrl } from '../../utils/formatImage'

const PageSection = ({ section }) => {
  if (!section) return null

  return (
    <div>
      {/* Layout 2 kolom — gambar kiri, deskripsi kanan */}
      <div className="flex flex-col lg:flex-row gap-8 items-start mb-8">
        
        {section.image_path && (
          <div className="w-full lg:w-1/2">
            <img
              src={getImageUrl(section.image_path)}
              alt={section.section_title}
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
        )}

        <div className={section.image_path ? 'w-full lg:w-1/2' : 'w-full'}>
          {section.section_title && (
            <h4 className="text-xl font-bold text-gray-800 uppercase mb-4">
              {section.section_title}
            </h4>
          )}
          {section.section_description && (
            <div
              className="prose prose-blue max-w-none text-gray-600 text-justify"
              dangerouslySetInnerHTML={{ __html: section.section_description }}
            />
          )}
          {section.label && (
            <div className="border border-blue-500 p-3 text-center mt-4">
              <h4 className="uppercase font-bold text-blue-600">{section.label}</h4>
            </div>
          )}
        </div>
      </div>

      {/* Extra content — full width */}
      {section.extra_content && (
        <div
          className="prose prose-blue max-w-none text-gray-600 text-justify"
          dangerouslySetInnerHTML={{ __html: section.extra_content }}
        />
      )}
    </div>
  )
}

export default PageSection