function ProductCard({ name, price, icon, category, rating, onAddToCart, onViewDetail }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between">
      <div>
        <div className="text-5xl text-center h-24 flex items-center justify-center">
          {typeof icon === 'string' && icon.startsWith('http') ? (
            <img src={icon} alt={name} className="h-20 object-contain mx-auto" />
          ) : (
            <span>{icon || '📦'}</span>
          )}
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-500 bg-blue-50 px-2 py-1 rounded">
            {category}
          </span>
          {rating && (
            <span className="text-xs text-yellow-500 font-bold flex items-center gap-1">
              ⭐ {rating}
            </span>
          )}
        </div>
        <h3 className="mt-2 text-lg font-bold text-gray-800 line-clamp-1">{name}</h3>
      </div>

      <div className="mt-4">
        <p className="text-xl font-bold text-blue-600">฿{price.toLocaleString()}</p>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            onClick={onViewDetail}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium text-sm transition"
          >
            View Detail
          </button>
          <button
            onClick={onAddToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-2 rounded-lg font-medium text-sm transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard