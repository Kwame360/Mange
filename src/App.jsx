import { useState } from 'react'
import './firebase/firebaseConfig';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import FoodGrid from './components/FoodGrid'
import Cart from './components/Cart'
import FoodDetail from './components/FoodDetail'
import { CartProvider } from './context/CartContext'
import Footer from './components/Footer'
import HelpModal from './components/HelpModal'

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [selectedFood, setSelectedFood] = useState(null)
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar 
          onCartClick={() => setIsCartOpen(true)} 
          onSearch={setSearchTerm} 
          onHelpClick={() => setIsHelpModalOpen(true)}
        />
        <main className="flex-grow max-w-[1440px] mx-auto px-4 py-8 w-full">
          <Hero />
          <Categories onCategorySelect={setSelectedCategory} />
          <FoodGrid 
            searchTerm={searchTerm} 
            selectedCategory={selectedCategory}
            onFoodClick={setSelectedFood}
          />
        </main>
        <Footer />
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <FoodDetail
          food={selectedFood}
          isOpen={!!selectedFood}
          onClose={() => setSelectedFood(null)}
        />
        <HelpModal
          isOpen={isHelpModalOpen}
          onClose={() => setIsHelpModalOpen(false)}
        />
      </div>
    </CartProvider>
  )
}

