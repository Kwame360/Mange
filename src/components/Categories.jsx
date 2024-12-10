import { Sparkles, Tag, Leaf, Coffee, GlassWater, Flame, Utensils } from 'lucide-react'
import { useState } from 'react'

const categories = [
  { id: 0, name: 'All Food', icon: Utensils },
  { id: 1, name: 'New Food', icon: Sparkles },
  { id: 2, name: 'Discount', icon: Tag },
  { id: 3, name: 'Healthy Choices', icon: Leaf },
  { id: 4, name: 'Desserts', icon: Coffee },
  { id: 5, name: 'Drinks', icon: GlassWater },
  { id: 6, name: 'Spicy Delights', icon: Flame },
]

export default function Categories({ onCategorySelect }) {
  const [selectedCategory, setSelectedCategory] = useState(0)

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId)
    onCategorySelect(categoryId)
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Category Restaurant</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {categories.map(category => (
          <button
            key={category.id}
            className={`flex flex-col items-center p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors ${
              selectedCategory === category.id ? 'ring-2 ring-green-500' : ''
            }`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
              {<category.icon className="w-6 h-6 text-green-600" />}
            </div>
            <span className="text-sm text-gray-700 text-center">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export { categories };

