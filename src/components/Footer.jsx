import { Facebook, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-green-500 text-white py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Mange</h3>
            <p className="text-sm mt-2">Delicious food, delivered to you.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-200">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-green-200">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-green-200">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} Mange. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

