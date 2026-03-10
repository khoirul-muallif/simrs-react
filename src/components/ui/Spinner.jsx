const Spinner = ({ className = '' }) => (
  <div className={`flex justify-center py-20 ${className}`}>
    <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
  </div>
)

export default Spinner