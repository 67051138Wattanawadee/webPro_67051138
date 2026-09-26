import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'

const productsData = [
  { id: 1, name: 'Laptop', priceText: '฿12,900', icon: '💻', rating: '4.5', reviews: 24 },
  { id: 2, name: 'Headphones', priceText: '฿1,290', icon: '🎧', rating: '4.3', reviews: 18 },
  { id: 3, name: 'Backpack', priceText: '฿890', icon: '🎒', rating: '4.7', reviews: 32 },
  { id: 4, name: 'Smart Watch', priceText: '฿2,990', icon: '⌚', rating: '4.4', reviews: 20 },
]

export default function App() {
  // ตั้งค่าเริ่มต้นให้เปิดมาเจอหน้า 'dashboard' ก่อน
  const [activeTab, setActiveTab] = useState('dashboard') // 'dashboard' | 'products' | 'product-detail' | 'profile'
  const [selectedProduct, setSelectedProduct] = useState(productsData[0])
  const [quantity, setQuantity] = useState(1)
  const [cartCount, setCartCount] = useState(0)

  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    setQuantity(1)
    setActiveTab('product-detail')
  }

  const handleAddToCart = () => {
    setCartCount(prev => prev + quantity)
  }

  const activeStyle = "w-full flex items-center gap-3 bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
  const inactiveStyle = "w-full flex items-center gap-3 text-gray-600 hover:bg-gray-50 text-sm px-4 py-2.5 rounded-lg transition-colors font-medium cursor-pointer"

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* HEADER */}
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>MiniShop</h1>
        <div className="flex items-center gap-5 text-gray-500 text-lg">
          <button className="hover:text-blue-600 cursor-pointer">🔍</button>
          <button className="hover:text-blue-600 relative cursor-pointer" onClick={() => setActiveTab('product-detail')}>
            🛒
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          </button>
          <button className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('profile')}>👤</button>
        </div>
      </header>

      {/* BODY */}
      <div className="flex flex-1">
        
        {/* SIDEBAR */}
        <aside className="w-56 bg-white border-r py-6 px-4 space-y-1 hidden md:block">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={activeTab === 'dashboard' ? activeStyle : inactiveStyle}
          >
            🏠 Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('products')} 
            className={(activeTab === 'products' || activeTab === 'product-detail') ? activeStyle : inactiveStyle}
          >
            📦 Products
          </button>
          <button 
            onClick={() => setActiveTab('profile')} 
            className={activeTab === 'profile' ? activeStyle : inactiveStyle}
          >
            👤 Profile
          </button>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-8">
          
          {/* ================= 1. TAB DASHBOARD ================= */}
          {activeTab === 'dashboard' && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl">📦</div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Total Products</p>
                    <h3 className="text-xl font-bold text-blue-600 mt-1">24</h3>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-xl">🛒</div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Orders</p>
                    <h3 className="text-xl font-bold text-green-600 mt-1">128</h3>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold">฿</div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Revenue</p>
                    <h3 className="text-xl font-bold text-purple-600 mt-1">฿48,500</h3>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-8 p-6">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Recent Orders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-600">
                    <thead className="bg-gray-50 text-gray-400 border-b">
                      <tr>
                        <th className="py-3 px-2 font-medium">#</th>
                        <th className="py-3 px-2 font-medium">Date</th>
                        <th className="py-3 px-2 font-medium">Customer</th>
                        <th className="py-3 px-2 font-medium">Items</th>
                        <th className="py-3 px-2 font-medium">Total</th>
                        <th className="py-3 px-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="py-3 px-2">1</td>
                        <td className="py-3 px-2">2025-09-15</td>
                        <td className="py-3 px-2">Somchai J.</td>
                        <td className="py-3 px-2">3</td>
                        <td className="py-3 px-2">฿1,260</td>
                        <td className="py-3 px-2"><span className="bg-green-50 text-green-600 px-2.5 py-1 rounded-md">Completed</span></td>
                      </tr>
                      <tr>
                        <td className="py-3 px-2">2</td>
                        <td className="py-3 px-2">2025-09-14</td>
                        <td className="py-3 px-2">Nattaya K.</td>
                        <td className="py-3 px-2">1</td>
                        <td className="py-3 px-2">฿520</td>
                        <td className="py-3 px-2"><span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md">Processing</span></td>
                      </tr>
                      <tr>
                        <td className="py-3 px-2">3</td>
                        <td className="py-3 px-2">2025-09-13</td>
                        <td className="py-3 px-2">Kritsada P.</td>
                        <td className="py-3 px-2">2</td>
                        <td className="py-3 px-2">฿980</td>
                        <td className="py-3 px-2"><span className="bg-purple-50 text-purple-600 px-2.5 py-1 rounded-md">Shipped</span></td>
                      </tr>
                      <tr>
                        <td className="py-3 px-2">4</td>
                        <td className="py-3 px-2">2025-09-12</td>
                        <td className="py-3 px-2">Piyaporn S.</td>
                        <td className="py-3 px-2">1</td>
                        <td className="py-3 px-2">฿450</td>
                        <td className="py-3 px-2"><span className="bg-green-50 text-green-600 px-2.5 py-1 rounded-md">Completed</span></td>
                      </tr>
                      <tr>
                        <td className="py-3 px-2">5</td>
                        <td className="py-3 px-2">2025-09-11</td>
                        <td className="py-3 px-2">Thanawat C.</td>
                        <td className="py-3 px-2">4</td>
                        <td className="py-3 px-2">฿1,800</td>
                        <td className="py-3 px-2"><span className="bg-yellow-50 text-yellow-600 px-2.5 py-1 rounded-md">Pending</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* ================= 2. TAB PRODUCTS ================= */}
          {activeTab === 'products' && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Products</h2>
              
              <div className="flex gap-4 mb-6">
                <input type="text" placeholder="🔍 Search products..." className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 flex-1 outline-none text-sm focus:border-blue-500" />
                <select className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 outline-none w-48">
                  <option>All Categories</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {productsData.map(item => (
                  <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="h-36 bg-slate-50 rounded-lg flex items-center justify-center text-5xl">{item.icon}</div>
                      <h3 className="text-sm font-bold mt-4 text-gray-800">{item.name}</h3>
                      <p className="text-gray-900 font-bold mt-1 text-sm">{item.priceText}</p>
                      <p className="text-yellow-400 text-xs mt-1">★ {item.rating} <span className="text-gray-400">({item.reviews})</span></p>
                    </div>
                    <button 
                      onClick={() => handleSelectProduct(item)}
                      className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ================= 3. TAB PRODUCT DETAIL ================= */}
          {activeTab === 'product-detail' && (
            <section>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">React Workshop</h2>
                  <p className="text-sm text-gray-500 font-medium mt-1">ลองใช้งาน React กับ Tailwind CSS</p>
                  <p className="text-xs text-gray-400 mt-0.5">เพิ่มจำนวนสินค้าในตะกร้า และดูจำนวนสินค้าที่เลือกได้ที่ไอคอนตะกร้า</p>
                </div>

                <div className="bg-white border border-gray-200 p-3 rounded-2xl shadow-sm relative flex items-center justify-center w-14 h-14">
                  <span className="text-2xl text-blue-600">🛒</span>
                  <span className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm max-w-2xl flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-full sm:w-48 h-48 bg-slate-50 rounded-2xl flex items-center justify-center text-7xl flex-shrink-0">
                  {selectedProduct.icon}
                </div>
                <div className="flex-1 w-full space-y-3">
                  <h3 className="text-lg font-bold text-gray-800">{selectedProduct.name}</h3>
                  <p className="text-xl font-bold text-gray-900">{selectedProduct.priceText}</p>
                  <p className="text-xs text-gray-500">
                    <span className="text-yellow-400">★</span> 
                    <span className="font-bold text-gray-700 ml-1">{selectedProduct.rating}</span> 
                    <span> ({selectedProduct.reviews})</span>
                  </p>
                  
                  <div className="flex items-center gap-3 pt-1">
                    <button 
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="w-10 h-10 bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all text-lg cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-sm font-semibold border border-gray-200 py-2 rounded-xl bg-white">
                      {quantity}
                    </span>
                    <button 
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="w-10 h-10 bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all text-lg cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button 
                    onClick={handleAddToCart}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>🛒</span> Add to Cart
                  </button>
                </div>
              </div>

              <button 
                onClick={() => setActiveTab('products')}
                className="mt-6 text-sm text-blue-600 hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                ← กลับไปหน้าสินค้าทั้งหมด
              </button>
            </section>
          )}

          {/* ================= 4. TAB PROFILE ================= */}
          {activeTab === 'profile' && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col items-center justify-between">
                  <div className="flex flex-col items-center w-full">
                    <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-5xl mb-4">
                      👤
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Watta Choomyen</h3>
                    
                    <div className="space-y-2 text-xs text-gray-500 text-left w-full max-w-xs mx-auto">
                      <div className="flex items-center gap-3 justify-center">
                        <span className="text-sm">✉️</span>
                        <span>67051138@kmitl.ac.th</span>
                      </div>
                      <div className="flex items-center gap-3 justify-center">
                        <span className="text-sm">🪪</span>
                        <span>Student ID: 67051138</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-8 bg-blue-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                    ✏️ Edit Profile
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="text-base font-bold text-gray-800 mb-4">Account Summary</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50/50 border border-blue-50 p-4 rounded-xl flex flex-col justify-between h-28">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">🛒</div>
                      <div>
                        <p className="text-[11px] text-gray-500 font-medium">Total Orders</p>
                        <h4 className="text-lg font-bold text-gray-800 mt-0.5">128</h4>
                      </div>
                    </div>

                    <div className="bg-purple-50/50 border border-purple-50 p-4 rounded-xl flex flex-col justify-between h-28">
                      <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">฿</div>
                      <div>
                        <p className="text-[11px] text-gray-500 font-medium">Total Spent</p>
                        <h4 className="text-lg font-bold text-gray-800 mt-0.5">฿48,500</h4>
                      </div>
                    </div>

                    <div className="bg-emerald-50/50 border border-emerald-50 p-4 rounded-xl flex flex-col justify-between h-28">
                      <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm">📦</div>
                      <div>
                        <p className="text-[11px] text-gray-500 font-medium">Wishlist Items</p>
                        <h4 className="text-lg font-bold text-gray-800 mt-0.5">6</h4>
                      </div>
                    </div>

                    <div className="bg-amber-50/50 border border-amber-50 p-4 rounded-xl flex flex-col justify-between h-28">
                      <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm">⭐</div>
                      <div>
                        <p className="text-[11px] text-gray-500 font-medium">Loyalty Points</p>
                        <h4 className="text-lg font-bold text-gray-800 mt-0.5">320</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  )
}

const rootElement = document.getElementById('app') || document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}