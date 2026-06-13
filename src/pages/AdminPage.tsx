import React, { useState } from 'react'
import Button from '../components/ui/Button'
import { useProducts } from '../context/ProductContext'

const AdminPage: React.FC = () => {
  const { products, updateProductPrice } = useProducts()
  const [priceUpdates, setPriceUpdates] = useState<Record<number, string>>({})
  const [message, setMessage] = useState('')

  const handleChange = (id: number, value: string) => {
    setPriceUpdates((prev) => ({ ...prev, [id]: value }))
  }

  const handleSave = (id: number) => {
    const value = priceUpdates[id]
    const nextPrice = value ? Number(value) : NaN

    if (Number.isNaN(nextPrice) || nextPrice <= 0) {
      setMessage('Please enter a valid price.')
      return
    }

    updateProductPrice(id, nextPrice)
    setMessage('Price saved successfully.')
    setPriceUpdates((prev) => ({ ...prev, [id]: '' }))
  }

  return (
    <div className="py-12 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 mb-6">
            This page is available without login. Update product prices directly from here.
          </p>

          {message && (
            <div className="mb-6 rounded-2xl bg-green-50 border border-green-200 text-green-700 px-4 py-3">
              {message}
            </div>
          )}

          <div className="space-y-6">
            {products.map((product) => (
              <div key={product.id} className="rounded-3xl border border-gray-200 p-6 bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
                    <p className="text-gray-600">Category: {product.category}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="w-full sm:w-40">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current price</label>
                      <div className="rounded-2xl border border-gray-300 bg-white px-3 py-3 text-gray-900">₹{product.price}</div>
                    </div>
                    <div className="w-full sm:w-40">
                      <label className="block text-sm font-medium text-gray-700 mb-2">New price</label>
                      <input
                        type="number"
                        min="1"
                        value={priceUpdates[product.id] ?? ''}
                        onChange={(e) => handleChange(product.id, e.target.value)}
                        className="w-full rounded-2xl border border-gray-300 px-3 py-3 outline-none focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter price"
                      />
                    </div>
                    <Button onClick={() => handleSave(product.id)} className="h-12 px-6 py-3">
                      Save Price
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
