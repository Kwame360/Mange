import { useState } from 'react'
import { X, Plus, Minus, MessageSquare } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Cart({ isOpen, onClose }) {
  const { items, removeFromCart, updateQuantity, total } = useCart()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')
  const [checkoutMethod, setCheckoutMethod] = useState('whatsapp')

  const handleCheckout = () => {
    const cartItemsText = items
      .map(item => {
        const extrasText = item.extras && item.extras.length > 0
          ? `\n    Extras: ${item.extras.map(extra => extra.name).join(', ')}`
          : '';
        return `${item.quantity}x ${item.name} - $${(item.totalPrice || 0).toFixed(2)}${extrasText}`;
      })
      .join('\n')

    const message = `
*New Order*
------------------
${cartItemsText}
------------------
*Total: $${total.toFixed(2)}*

*Customer Details:*
Name: ${name}
Address: ${address}
Note: ${note}
`
    if (checkoutMethod === 'whatsapp') {
      const whatsappUrl = `https://wa.me/233504548794?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
    } else {
      const smsUrl = `sms:233504548794?body=${encodeURIComponent(message)}`
      window.open(smsUrl)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 mt-8">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${(item.price || 0).toFixed(2)}</p>
                    {item.extras && item.extras.length > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        Extras: {item.extras.map(extra => extra.name).join(', ')}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.extras, Math.max(0, (item.quantity || 0) - 1))}
                        className="p-1 bg-green-100 text-green-600 hover:bg-green-200 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold min-w-[20px] text-center">{item.quantity || 0}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.extras, (item.quantity || 0) + 1)}
                        className="p-1 bg-green-100 text-green-600 hover:bg-green-200 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(item.totalPrice || 0).toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(item.id, item.extras)}
                      className="p-2 hover:bg-gray-200 rounded mt-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t p-4 space-y-4 bg-white">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <textarea
              placeholder="Add Note (You can add your contact here)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="3"
            />
          </div>

          <div className="flex gap-2 p-2 bg-gray-50 rounded-lg">
            <button
              onClick={() => setCheckoutMethod('whatsapp')}
              className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 ${
                checkoutMethod === 'whatsapp' ? 'bg-green-500 text-white' : 'bg-white'
              }`}
            >
              WhatsApp
            </button>
            <button
              onClick={() => setCheckoutMethod('sms')}
              className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 ${
                checkoutMethod === 'sms' ? 'bg-green-500 text-white' : 'bg-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              SMS
            </button>
          </div>

          <button
            onClick={handleCheckout}
            disabled={items.length === 0 || !name || !address}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {checkoutMethod === 'whatsapp' ? 'Proceed to WhatsApp Checkout' : 'Proceed to SMS Checkout'}
          </button>
        </div>
      </div>
    </div>
  )
}

