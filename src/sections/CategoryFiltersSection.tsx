import React from 'react'
import Badge from '../components/ui/Badge'

const CategoryFiltersSection: React.FC = () => {
  const categories = [
    { name: 'T-Shirts', count: 45 },
    { name: 'Caps', count: 32 },
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">
                  {category.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
              <Badge variant="secondary">{category.count} items</Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryFiltersSection 