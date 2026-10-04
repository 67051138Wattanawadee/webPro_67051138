function Header({ cartCount, activeTab, onSelectTab }) {
  return (
    <header className="bg-white rounded-xl p-4 shadow-sm mb-6 flex justify-between items-center">
      <div className="flex items-center gap-2 text-2xl font-bold text-blue-600">
        🛒 MiniShop
      </div>

      <nav className="flex items-center gap-6 font-medium text-gray-600">
        <button
          onClick={() => onSelectTab('products')}
          className={`transition ${
            activeTab === 'products' ? 'text-blue-600 font-bold border-b-2 border-blue-600 pb-1' : 'hover:text-gray-900'
          }`}
        >
          Products
        </button>
        <button
          onClick={() => onSelectTab('profile')}
          className={`transition ${
            activeTab === 'profile' ? 'text-blue-600 font-bold border-b-2 border-blue-600 pb-1' : 'hover:text-gray-900'
          }`}
        >
          Profile
        </button>
      </nav>

      <div className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-gray-700">
        🛒 {cartCount}
      </div>
    </header>
  )
}

export default Header