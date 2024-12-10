import { useState, useEffect } from 'react'
import { X, Minus, Plus } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function FoodDetail({ food, isOpen, onClose }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedExtras, setSelectedExtras] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    if (food) {
      const extrasTotal = selectedExtras.reduce((sum, extra) => sum + (extra.price || 0), 0)
      setTotalPrice(((food.price || 0) + extrasTotal) * quantity)
    }
  }, [food, quantity, selectedExtras])

  useEffect(() => {
    // Reset selected extras when a new food item is opened
    setSelectedExtras([])
    setQuantity(1)
  }, [food])

  if (!isOpen || !food) return null

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  const handleExtraToggle = (extra) => {
    setSelectedExtras(prev => {
      if (prev.find(e => e.id === extra.id)) {
        return prev.filter(e => e.id !== extra.id)
      } else {
        return [...prev, extra]
      }
    })
  }

  const handleAddToCart = () => {
    addToCart({
      ...food,
      quantity,
      extras: selectedExtras,
      totalPrice: totalPrice
    })
    onClose()
  }

  const extras = food.extras || [
    { id: 1, name: 'Extra cheese', price: 1.5 },
    { id: 2, name: 'Bacon', price: 2 },
    { id: 3, name: 'Special sauce', price: 0.5 },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md md:max-w-lg rounded-2xl max-h-[90vh] overflow-hidden">
        <div className="relative h-64 md:h-80">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg z-10"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-20rem)]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">{food.name}</h2>
              <p className="text-gray-600">{food.restaurant}</p>
            </div>
            <div className="text-2xl font-bold text-green-600">
              ${totalPrice.toFixed(2)}
            </div>
          </div>

          <p className="text-gray-700 mb-6">
            {food.description || 'Delicious food prepared with the finest ingredients.'}
          </p>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Extras</h3>
            {extras.map(extra => (
              <label key={extra.id} className="flex items-center space-x-3 mb-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-green-600"
                  checked={selectedExtras.some(e => e.id === extra.id)}
                  onChange={() => handleExtraToggle(extra)}
                />
                <span>{extra.name} (+${(extra.price || 0).toFixed(2)})</span>
              </label>
            ))}
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
          >
            Add to Cart - ${totalPrice.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  )
}

