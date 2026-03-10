const variants = {
  green:  'bg-green-100 text-green-700',
  red:    'bg-red-100 text-red-600',
  yellow: 'bg-yellow-100 text-yellow-700',
  gray:   'bg-gray-100 text-gray-500',
  blue:   'bg-blue-100 text-blue-700',
}

const Badge = ({ children, variant = 'green' }) => (
  <span className={`text-xs px-2 py-0.5 rounded-full ${variants[variant]}`}>
    {children}
  </span>
)

export default Badge