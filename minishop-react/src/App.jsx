import { useState, useEffect } from 'react'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Profile from './components/Profile'
import ProductModal from './components/ProductModal'

const fallbackProducts = [
  { id: 1, name: 'Laptop', price: 12900, icon: '💻', category: 'Computer', rating: 4.8, description: 'โน้ตบุ๊กประสิทธิภาพสูง เหมาะสำหรับการทำงานและเล่นเกม' },
  { id: 2, name: 'Headphones', price: 1290, icon: '🎧', category: 'Audio', rating: 4.5, description: 'หูฟังไร้สาย เสียงเบสนุ่มลึก ตัดเสียงรบกวนได้ดี' },
  { id: 3, name: 'Backpack', price: 890, icon: '🎒', category: 'Fashion', rating: 4.2, description: 'กระเป๋าเป้สะพายหลัง กันน้ำ ช่องเก็บของเยอะ' },
  { id: 4, name: 'Smart Watch', price: 2990, icon: '⌚', category: 'Gadget', rating: 4.6, description: 'นาฬิกาอัจฉริยะ วัดอัตราการเต้นหัวใจ พร้อมโหมดออกกำลังกาย' }
]

function App() {
  const [products, setProducts] = useState(fallbackProducts)
  const [search, setSearch] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const [loading, setLoading] = useState(true)

  // Tab State: 'products' หรือ 'profile'
  const [activeTab, setActiveTab] = useState('products')

  // Challenge States
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('default')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const categories = ['All', 'Computer', 'Audio', 'Fashion', 'Gadget']

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1)
  }

  useEffect(() => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)

    fetch('https://fakestoreapi.com/products', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลได้')
        return res.json()
      })
      .then((data) => {
        const mappedData = data.map((item) => ({
          id: item.id,
          name: item.title,
          price: Math.round(item.price * 35),
          icon: item.image,
          category: item.category.includes('electronics') ? 'Computer' : 
                    item.category.includes('jewelery') ? 'Gadget' : 'Fashion',
          rating: item.rating?.rate || 4.5,
          description: item.description
        }))
        setProducts(mappedData)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        console.warn('API Fetch Issue, using Fallback Data:', err)
        setProducts(fallbackProducts)
      })
      .finally(() => {
        clearTimeout(timeoutId)
        setLoading(false)
      })

    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'low-high') return a.price - b.price
    if (sortBy === 'high-low') return b.price - a.price
    return 0
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading products...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* ส่ง activeTab และ setActiveTab ให้ Header */}
        <Header 
          cartCount={cartCount} 
          activeTab={activeTab} 
          onSelectTab={setActiveTab} 
        />

        {/* สลับการแสดงผลตาม Tab ที่เลือก */}
        {activeTab === 'profile' ? (
          <Profile />
        ) : (
          <>
            {/* Search & Sort Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center mb-6">
              <div className="max-w-md w-full">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full border p-3 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 bg-white p-1 rounded-lg border shadow-sm">
                <span className="text-sm font-medium text-gray-500 px-2">Sort:</span>
                <button
                  onClick={() => setSortBy('default')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${sortBy === 'default' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Default
                </button>
                <button
                  onClick={() => setSortBy('low-high')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${sortBy === 'low-high' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Price: Low → High
                </button>
                <button
                  onClick={() => setSortBy('high-low')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${sortBy === 'high-low' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Price: High → Low
                </button>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-200 shadow-sm'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Products</h2>

            {sortedProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow text-gray-500 text-lg">
                ไม่พบสินค้าที่ค้นหา
              </div>
            ) : (
              <ProductList
                products={sortedProducts}
                onAddToCart={handleAddToCart}
                onViewDetail={(product) => setSelectedProduct(product)}
              />
            )}
          </>
        )}

        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  )
}

export default App