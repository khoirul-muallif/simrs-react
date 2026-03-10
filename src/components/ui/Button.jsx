const variants = {
  primary: 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white',
  secondary: 'border border-gray-300 text-gray-600 hover:bg-gray-50',
  success: 'bg-green-500 hover:bg-green-600 text-white',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  outline: 'border border-blue-500 text-blue-600 hover:bg-blue-50',
}

const Button = ({ children, variant = 'primary', className = '', disabled, onClick, type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-lg font-semibold transition ${variants[variant]} ${className}`}
  >
    {children}
  </button>
)

export default Button