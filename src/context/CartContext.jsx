import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const calculateItemTotal = (item) => {
    const basePrice = item.price || 0
    const extrasTotal = (item.extras || []).reduce((sum, extra) => sum + (extra.price || 0), 0)
    return (basePrice + extrasTotal) * (item.quantity || 1)
  }

  const addToCart = (item) => {
    setItems(prev => {
      const existingItemIndex = prev.findIndex(i => 
        i.id === item.id && 
        JSON.stringify(i.extras) === JSON.stringify(item.extras)
      )
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...prev]
        const existingItem = updatedItems[existingItemIndex]
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: (existingItem.quantity || 1) + (item.quantity || 1),
          totalPrice: calculateItemTotal({
            ...existingItem,
            quantity: (existingItem.quantity || 1) + (item.quantity || 1)
          })
        }
        return updatedItems
      }
      
      return [...prev, { 
        ...item, 
        quantity: item.quantity || 1,
        totalPrice: calculateItemTotal(item)
      }]
    })
  }

  const removeFromCart = (itemId, extras) => {
    setItems(prev => prev.filter(item => 
      !(item.id === itemId && JSON.stringify(item.extras) === JSON.stringify(extras))
    ))
  }

  const updateQuantity = (itemId, extras, quantity) => {
    if (quantity === 0) {
      removeFromCart(itemId, extras)
      return
    }
    setItems(prev => 
      prev.map(item => {
        if (item.id === itemId && JSON.stringify(item.extras) === JSON.stringify(extras)) {
          return {
            ...item,
            quantity,
            totalPrice: calculateItemTotal({ ...item, quantity })
          }
        }
        return item
      })
    )
  }

  const total = items.reduce((sum, item) => sum + (item.totalPrice || 0), 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

