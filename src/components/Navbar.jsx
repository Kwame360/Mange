import { useState } from 'react'
import { ShoppingCart, HelpCircle, Menu, Search } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Navbar({ onCartClick, onSearch, onHelpClick }) {
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (value) => {
    setSearchValue(value)
    onSearch(value)
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col px-4">
          {/* Top row for mobile */}
          <div className="flex items-center justify-between h-16 md:hidden">
            <span className="text-xl font-bold text-green-600">Magical Munch</span>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 relative"
            >
              <Menu className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Search bar for mobile */}
          <div className="pb-3 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search food or restaurant"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-green-600">Magical Munch</span>
            </div>
            
            <div className="flex-1 max-w-xl px-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search food or restaurant"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={onHelpClick}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <HelpCircle className="h-6 w-6 text-gray-600" />
              </button>
              <button 
                className="p-2 hover:bg-gray-100 rounded-full relative"
                onClick={onCartClick}
              >
                <ShoppingCart className="h-6 w-6 text-gray-600" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left flex items-center justify-between ${
                  itemCount > 0 ? 'text-green-600' : 'text-gray-700'
                } hover:text-gray-900 hover:bg-gray-50`}
                onClick={() => {
                  onCartClick();
                  setIsMenuOpen(false);
                }}
              >
                <span>Cart</span>
                {itemCount > 0 && (
                  <span className="bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <button
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full text-left"
                onClick={() => {
                  onHelpClick();
                  setIsMenuOpen(false);
                }}
              >
                Help
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

