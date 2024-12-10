import { useState } from 'react'
import { X, ChevronDown, ChevronUp } from 'lucide-react'

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b">
      <button
        className="flex justify-between items-center w-full py-4 text-left font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  )
}

export default function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Help & Information</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[calc(100vh-10rem)]">
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p>Magical Munch is your go-to food delivery app, bringing delicious meals from local restaurants right to your doorstep.</p>
          </section>
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">FAQs</h3>
            <Accordion title="How do I place an order?">
              <p>Browse our menu, select your items, and proceed to checkout. It's that simple!</p>
            </Accordion>
            <Accordion title="What are your delivery hours?">
              <p>We deliver from 10 AM to 10 PM, seven days a week.</p>
            </Accordion>
            <Accordion title="How can I track my order?">
              <p>Once your order is confirmed, you'll receive a tracking link via SMS or WhatsApp.</p>
            </Accordion>
          </section>
          <section>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p>Email: support@magicalmunch.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <div className="mt-2">
              <p className="font-semibold">Follow us:</p>
              <div className="flex space-x-4 mt-1">
                <a href="#" className="text-blue-600 hover:text-blue-800">Facebook</a>
                <a href="#" className="text-blue-400 hover:text-blue-600">Twitter</a>
                <a href="#" className="text-pink-600 hover:text-pink-800">Instagram</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

