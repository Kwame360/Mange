import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { categories } from './Categories'
import { db } from '../firebase/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'

export default function FoodGrid({ searchTerm, selectedCategory, onFoodClick }) {
  const { addToCart, updateQuantity, items } = useCart()
  const [foodItems, setFoodItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFoodItems = async () => {
      setLoading(true)
      try {
        let q = collection(db, 'foodItems')
        
        if (selectedCategory !== 0) {
          const categoryName = categories.find(cat => cat.id === selectedCategory)?.name || 'All Food'
          q = query(q, where('tags', 'array-contains', categoryName))
        }

        const querySnapshot = await getDocs(q)
        const fetchedItems = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

        setFoodItems(fetchedItems)
      } catch (error) {
        console.error("Error fetching food items:", error)
      }
      setLoading(false)
    }

    fetchFoodItems()
  }, [selectedCategory])

  const filteredItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.restaurant.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getItemQuantity = (itemId) => {
    const cartItem = items.find(item => item.id === itemId)
    return cartItem ? cartItem.quantity : 0
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-gray-600">No Such Food Found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredItems.map(item => (
        <div 
          key={item.id} 
          className="bg-white rounded-lg shadow-md p-4 w-full max-w-xs mx-auto cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onFoodClick(item)}
        >
          <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg" />
          <h2 className="text-lg font-medium mt-2">{item.name}</h2>
          <p className="text-gray-600 text-sm">{item.restaurant}</p>
          <p className="text-gray-600 text-sm mt-1">${item.price.toFixed(2)}</p>
          <div className="flex items-center mt-2">
            {getItemQuantity(item.id) === 0 ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item);
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity(item.id, getItemQuantity(item.id) - 1);
                  }}
                  className="bg-green-100 text-green-600 hover:bg-green-200 p-1 rounded"
                >
                  -
                </button>
                <span className="font-semibold">{getItemQuantity(item.id)}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity(item.id, getItemQuantity(item.id) + 1);
                  }}
                  className="bg-green-100 text-green-600 hover:bg-green-200 p-1 rounded"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

