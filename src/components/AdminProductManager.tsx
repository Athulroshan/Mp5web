import React, { useState } from 'react'
import { Plus, Edit2, Trash2, Image, AlertCircle } from 'lucide-react'
import Button from './ui/Button'
import Input from './ui/Input'

interface ProductFormData {
  name: string
  description: string
  category: string
  price: number
  originalPrice: number
  sku: string
  stock: number
  colors: string[]
  sizes: string[]
  badge: string
  isFeatured: boolean
  isTrending: boolean
  isNewArrival: boolean
  images: string[]
}

interface AdminProductManagerProps {
  onProductSave: (product: ProductFormData) => void
  onProductDelete: (productId: number) => void
  products: any[]
}

const AdminProductManager: React.FC<AdminProductManagerProps> = ({
  onProductSave,
  onProductDelete,
  products = []
}) => {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category: 'shirts',
    price: 0,
    originalPrice: 0,
    sku: '',
    stock: 0,
    colors: ['Black'],
    sizes: ['M'],
    badge: 'New',
    isFeatured: false,
    isTrending: false,
    isNewArrival: true,
    images: []
  })

  const categories = ['shirts', 'jackets', 'dresses', 'pants', 'shoes', 'accessories']
  const badges = ['New', 'Sale', 'Trending', 'Popular', 'Limited']

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleColorChange = (newColors: string) => {
    setFormData((prev) => ({
      ...prev,
      colors: newColors.split(',').map((c) => c.trim())
    }))
  }

  const handleSizeChange = (newSizes: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: newSizes.split(',').map((s) => s.trim())
    }))
  }

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.sku.trim() || formData.price <= 0) {
      alert('Please fill in all required fields')
      return
    }
    onProductSave(formData)
    setFormData({
      name: '',
      description: '',
      category: 'shirts',
      price: 0,
      originalPrice: 0,
      sku: '',
      stock: 0,
      colors: ['Black'],
      sizes: ['M'],
      badge: 'New',
      isFeatured: false,
      isTrending: false,
      isNewArrival: true,
      images: []
    })
    setShowForm(false)
    setEditingId(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <Button
            onClick={() => {
              setShowForm(!showForm)
              setEditingId(null)
              if (showForm) {
                setFormData({
                  name: '',
                  description: '',
                  category: 'shirts',
                  price: 0,
                  originalPrice: 0,
                  sku: '',
                  stock: 0,
                  colors: ['Black'],
                  sizes: ['M'],
                  badge: 'New',
                  isFeatured: false,
                  isTrending: false,
                  isNewArrival: true,
                  images: []
                })
              }
            }}
            className="flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            {showForm ? 'Cancel' : 'Add Product'}
          </Button>
        </div>

        {/* Product Form */}
        {showForm && (
          <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{editingId ? 'Edit' : 'Add New'} Product</h2>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Basic Info */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">SKU *</label>
                <Input
                  value={formData.sku}
                  onChange={(e) => handleFormChange('sku', e.target.value)}
                  placeholder="e.g., SHIRT-001"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleFormChange('category', e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Badge</label>
                <select
                  value={formData.badge}
                  onChange={(e) => handleFormChange('badge', e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                >
                  {badges.map((badge) => (
                    <option key={badge} value={badge}>
                      {badge}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹) *</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleFormChange('price', parseFloat(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Original Price (₹)</label>
                <Input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => handleFormChange('originalPrice', parseFloat(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity *</label>
                <Input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleFormChange('stock', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Colors (comma-separated)</label>
                <Input
                  value={formData.colors.join(', ')}
                  onChange={(e) => handleColorChange(e.target.value)}
                  placeholder="Black, White, Blue"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sizes (comma-separated)</label>
                <Input
                  value={formData.sizes.join(', ')}
                  onChange={(e) => handleSizeChange(e.target.value)}
                  placeholder="S, M, L, XL"
                />
              </div>

              {/* Flags */}
              <div className="lg:col-span-2 grid grid-cols-3 gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => handleFormChange('isFeatured', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isTrending}
                    onChange={(e) => handleFormChange('isTrending', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">Trending</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isNewArrival}
                    onChange={(e) => handleFormChange('isNewArrival', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">New Arrival</span>
                </label>
              </div>

              {/* Description */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  placeholder="Enter product description"
                  rows={4}
                  className="w-full rounded-3xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Image Upload */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Product Images</label>
                <div className="rounded-3xl border-2 border-dashed border-gray-300 p-6 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition">
                  <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Drag and drop images or click to upload</p>
                  <p className="text-xs text-gray-500 mt-1">Supports JPG, PNG up to 5MB each</p>
                  <input type="file" multiple accept="image/*" className="hidden" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingId ? 'Update Product' : 'Add Product'}
              </Button>
            </div>
          </div>
        )}

        {/* Products List */}
        <div className="rounded-3xl bg-white shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">SKU</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-600">{product.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-gray-600">{product.sku}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 capitalize">{product.category}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">₹{product.price}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            product.stock > 10
                              ? 'bg-green-100 text-green-800'
                              : product.stock > 0
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {product.stock} units
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {product.isFeatured && <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">Featured</span>}
                          {product.isTrending && <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">Trending</span>}
                          {product.isNewArrival && <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium">New</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('Delete this product?')) {
                                onProductDelete(product.id)
                              }
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">No products added yet. Click "Add Product" to get started.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alert */}
        {products.some((p) => p.stock > 0 && p.stock <= 10) && (
          <div className="mt-6 rounded-2xl bg-yellow-50 border border-yellow-200 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-900">Low Stock Alert</p>
              <p className="text-sm text-yellow-700">
                {products.filter((p) => p.stock > 0 && p.stock <= 10).length} product(s) are running low on stock.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminProductManager
