function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          ✕
        </button>

        <div className="text-center">
          <div className="h-36 flex items-center justify-center mb-4">
            {typeof product.icon === 'string' && product.icon.startsWith('http') ? (
              <img src={product.icon} alt={product.name} className="h-32 object-contain" />
            ) : (
              <span className="text-6xl">{product.icon || '📦'}</span>
            )}
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-500 bg-blue-50 px-2 py-1 rounded">
            {product.category}
          </span>
          <h3 className="text-2xl font-bold text-gray-800 mt-2">{product.name}</h3>
          
          <div className="flex justify-center items-center gap-2 my-2 text-yellow-500 font-bold">
            ⭐ {product.rating || '4.5'} / 5.0
          </div>

          <p className="text-gray-600 text-sm my-4">
            {product.description || 'สินค้าคุณภาพยอดเยี่ยม พร้อมการรับประกันและบริการหลังการขาย'}
          </p>

          <p className="text-3xl font-bold text-blue-600 my-4">฿{product.price.toLocaleString()}</p>

          <button
            onClick={() => {
              onAddToCart()
              onClose()
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition shadow-lg shadow-blue-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductModal