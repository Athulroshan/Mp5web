import React, { useState, useEffect } from 'react'
// ...existing code...
import { Card, CardContent, CardFooter } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

import { Filter, Star, Grid, List, Search, X, Heart, ShoppingCart, Eye, Share2 } from 'lucide-react'
import { useCart } from '../context/CartContext'

const ProductListingPage: React.FC = () => {
  try {
  const { addItem } = useCart()
  const [showToast, setShowToast] = useState(false)
  const [toastProduct, setToastProduct] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [priceRange, setPriceRange] = useState<string>('all')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('featured')
    const [wishlistItems, setWishlistItems] = useState<number[]>([])

    // Close mobile filter on route change
    useEffect(() => {
      setIsMobileFilterOpen(false)
    }, [selectedCategory, priceRange])

    const categories = [
      { id: 'all', name: 'All Categories',},
      { id: 'apparel', name: 'T-shirts' },
      { id: 'apparel', name: 'Sports wears',}, 
      { id: 'bottles', name: 'Bottles',},
      { id: 'accessories', name: 'key Chain',},
      { id: 'accessories', name: 'Caps'},
      { id: 'accessories', name: 'Accessories'}
    ]

    const priceRanges = [
      { id: 'all', name: 'All Prices', range: 'All' },
      { id: 'under-100', name: 'Under ₹100', range: 'Under ₹100' },
      { id: '100-500', name: '₹100 - ₹500', range: '₹100 - ₹500' },
      { id: '500-1000', name: '₹500 - ₹1000', range: '₹500 - ₹1000' },
      { id: 'over-1000', name: 'Over ₹1000', range: 'Over ₹1000' }
    ]

    const sortOptions = [
      { id: 'featured', name: 'Featured' },
      { id: 'price-low', name: 'Price: Low to High' },
      { id: 'price-high', name: 'Price: High to Low' },
      { id: 'rating', name: 'Highest Rated' },
      { id: 'newest', name: 'Newest First' }
    ]

    const products = [
      {
        id: 1,
        name: 'Premium Cotton T-Shirt',
        price: 450,
        originalPrice: 1000,
        category: 'shirts',
        rating: 4.8,
        reviews: 124,
        images: [
          '/photo/1.png',
          '/photo/1.png'
        ],
        badge: 'Sale',
        colors: ['White', 'Black', 'Navy', 'Gray'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Ultra-soft premium cotton t-shirt with perfect fit and breathable fabric.'
      },
      {
        id: 2,
        name: 'Classic Denim Jacket',
        price: 450,
        originalPrice: 600,
        category: 'jackets',
        rating: 4.9,
        reviews: 89,
        images: [
          '/photo/2.png',
          '/photo/2.png'
        ],
        badge: 'Best Seller',
        colors: ['Blue', 'Black', 'Gray'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: 'Timeless denim jacket with modern fit and premium construction.'
      },
      {
        id: 3,
        name: 'Elegant Evening Dress',
        price: 320,
        originalPrice: 400,
        category: 'dresses',
        rating: 4.7,
        reviews: 67,
        images: [
          '/photo/4.png',
          '/photo/3.png'
        ],
        badge: 'New',
        colors: ['Black', 'Red', 'Navy'],
        sizes: ['XS', 'S', 'M', 'L'],
        description: 'Stunning evening dress perfect for special occasions and formal events.'
      },
      {
        id: 4,
        name: 'Slim Fit Jeans',
        price: 120,
        originalPrice: 150,
        category: 'pants',
        rating: 4.6,
        reviews: 203,
        images: [
          '/photo/11.png',
          '/photo/10.png'
          
        ],
        badge: 'Popular',
        colors: ['Blue', 'Black', 'Gray'],
        sizes: ['28', '30', '32', '34', '36'],
        description: 'Modern slim fit jeans with stretch comfort and contemporary style.'
      },
      {
        id: 5,
        name: 'Running Sneakers',
        price: 180,
        originalPrice: 220,
        category: 'shoes',
        rating: 4.5,
        reviews: 156,
        images: [
           '/photo/20.png',
          '/photo/19.png'
        ],
        badge: 'Limited',
        colors: ['White', 'Black', 'Red'],
        sizes: ['7', '8', '9', '10', '11', '12'],
        description: 'High-performance running shoes with superior cushioning and support.'
      },
      {
        id: 6,
        name: 'Leather Crossbody Bag',
        price: 95,
        originalPrice: 130,
        category: 'accessories',
        rating: 4.4,
        reviews: 78,
        images: [
            '/photo/25.png',
          '/photo/24.png'
        ],
        badge: 'Trending',
        colors: ['Brown', 'Black', 'Tan'],
        sizes: ['One Size'],
        description: 'Elegant leather crossbody bag perfect for everyday use and travel.'
      },
      {
        id: 7,
        name: 'Leather Crossbody Bag',
        price: 95,
        originalPrice: 130,
        category: 'accessories',
        rating: 4.4,
        reviews: 78,
        images: [
            '/photo/23.png',
          '/photo/22.png'
        ],
        badge: 'Trending',
        colors: ['Brown', 'Black', 'Tan'],
        sizes: ['One Size'],
        description: 'Elegant leather crossbody bag perfect for everyday use and travel.'
      },
      {
        id: 8,
        name: 'Leather Crossbody Bag',
        price: 95,
        originalPrice: 130,
        category: 'accessories',
        rating: 4.4,
        reviews: 78,
        images: [
            '/photo/33.png',
          '/photo/32.png'
        ],
        badge: 'Trending',
        colors: ['Brown', 'Black', 'Tan'],
        sizes: ['One Size'],
        description: 'Elegant leather crossbody bag perfect for everyday use and travel.'
      },

      {
        id: 9,
        name: 'Leather Crossbody Bag',
        price: 95,
        originalPrice: 130,
        category: 'accessories',
        rating: 4.4,
        reviews: 78,
        images: [
            '/photo/27.png',
          '/photo/26.png'
        ],
        badge: 'Trending',
        colors: ['Brown', 'Black', 'Tan'],
        sizes: ['One Size'],
        description: 'Elegant leather crossbody bag perfect for everyday use and travel.'
      },
      {
        id: 10,
        name: 'Leather Crossbody Bag',
        price: 95,
        originalPrice: 130,
        category: 'accessories',
        rating: 4.4,
        reviews: 78,
        images: [
            '/photo/21.png',
          '/photo/21.png'
        ],
        badge: 'Trending',
        colors: ['Brown', 'Black', 'Tan'],
        sizes: ['One Size'],
        description: 'Elegant leather crossbody bag perfect for everyday use and travel.'
      },
      {
        id: 11,
        name: 'Leather Crossbody Bag',
        price: 95,
        originalPrice: 130,
        category: 'accessories',
        rating: 4.4,
        reviews: 78,
        images: [
            '/photo/29.png',
          '/photo/29.png'
        ],
        badge: 'Trending',
        colors: ['Brown', 'Black', 'Tan'],
        sizes: ['One Size'],
        description: 'Elegant leather crossbody bag perfect for everyday use and travel.'
      },
      {
        id: 12,
        name: 'Leather Crossbody Bag',
        price: 95,
        originalPrice: 130,
        category: 'accessories',
        rating: 4.4,
        reviews: 78,
        images: [
            '/photo/35.png',
          '/photo/35.png'
        ],
        badge: 'Trending',
        colors: ['Brown', 'Black', 'Tan'],
        sizes: ['One Size'],
        description: 'Elegant leather crossbody bag perfect for everyday use and travel.'
      },
      {
        id: 13,
        name: 'Leather Crossbody Bag',
        price: 95,
        originalPrice: 130,
        category: 'accessories',
        rating: 4.4,
        reviews: 78,
        images: [
            '/photo/36.png',
          '/photo/36.png'
        ],
        badge: 'Trending',
        colors: ['Brown', 'Black', 'Tan'],
        sizes: ['One Size'],
        description: 'Elegant leather crossbody bag perfect for everyday use and travel.'
      },
      {
        id: 14,
        name: 'Leather Crossbody Bag',
        price: 95,
        originalPrice: 130,
        category: 'accessories',
        rating: 4.4,
        reviews: 78,
        images: [
            '/photo/37.png',
          '/photo/37.png'
        ],
        badge: 'Trending',
        colors: ['Brown', 'Black', 'Tan'],
        sizes: ['One Size'],
        description: 'Elegant leather crossbody bag perfect for everyday use and travel.'
      },
      {
        id: 15,
        name: 'Leather Crossbody Bag',
        price: 95,
        originalPrice: 130,
        category: 'accessories',
        rating: 4.4,
        reviews: 78,
        images: [
            '/photo/17.png',
          '/photo/17.png'
        ],
        badge: 'Trending',
        colors: ['Brown', 'Black', 'Tan'],
        sizes: ['One Size'],
        description: 'Elegant leather crossbody bag perfect for everyday use and travel.'
      },
      {
        id: 16,
        name: 'Leather Crossbody Bag',
        price: 95,
        originalPrice: 130,
        category: 'accessories',
        rating: 4.4,
        reviews: 78,
        images: [
            '/photo/5.png',
          '/photo/5.png'
        ],
        badge: 'Trending',
        colors: ['Brown', 'Black', 'Tan'],
        sizes: ['One Size'],
        description: 'Elegant leather crossbody bag perfect for everyday use and travel.'
      },
      {
        id: 17,
        name: 'Leather Crossbody Bag',
        price: 95,
        originalPrice: 130,
        category: 'accessories',
        rating: 4.4,
        reviews: 78,
        images: [
            '/photo/12.png',
          '/photo/12.png'
        ],
        badge: 'Trending',
        colors: ['Brown', 'Black', 'Tan'],
        sizes: ['One Size'],
        description: 'Elegant leather crossbody bag perfect for everyday use and travel.'
      },
      {
        id: 18,
        name: 'Leather Crossbody Bag',
        price: 95,
        originalPrice: 130,
        category: 'accessories',
        rating: 4.4,
        reviews: 78,
        images: [
            '/photo/13.png',
          '/photo/14.png'
        ],
        badge: 'Trending',
        colors: ['Brown', 'Black', 'Tan'],
        sizes: ['One Size'],
        description: 'Elegant leather crossbody bag perfect for everyday use and travel.'
      },
      {
        id: 19,
        name: 'Leather Crossbody Bag',
        price: 95,
        originalPrice: 130,
        category: 'accessories',
        rating: 4.4,
        reviews: 78,
        images: [
            '/photo/15.png',
          '/photo/15.png'
        ],
        badge: 'Trending',
        colors: ['Brown', 'Black', 'Tan'],
        sizes: ['One Size'],
        description: 'Elegant leather crossbody bag perfect for everyday use and travel.'
      },
      {
        id: 20,
        name: 'Leather Crossbody Bag',
        price: 95,
        originalPrice: 130,
        category: 'accessories',
        rating: 4.4,
        reviews: 78,
        images: [
            '/photo/16.png',
          '/photo/16.png'
        ],
        badge: 'Trending',
        colors: ['Brown', 'Black', 'Tan'],
        sizes: ['One Size'],
        description: 'Elegant leather crossbody bag perfect for everyday use and travel.'
      },
        {
        id: 21,
        name: 'Leather Crossbody Bag',
        price: 95,
        originalPrice: 130,
        category: 'accessories',
        rating: 4.4,
        reviews: 78,
        images: [
            '/photo/18.png',
          '/photo/18.png'
        ],
        badge: 'Trending',
        colors: ['Brown', 'Black', 'Tan'],
        sizes: ['One Size'],
        description: 'Elegant leather crossbody bag perfect for everyday use and travel.'
      },
      {
        id: 22,
        name: 'Leather Crossbody Bag',
        price: 95,
        originalPrice: 130,
        category: 'accessories',
        rating: 4.4,
        reviews: 78,
        images: [
            '/photo/34.png',
          '/photo/34.png'
        ],
        badge: 'Trending',
        colors: ['Brown', 'Black', 'Tan'],
        sizes: ['One Size'],
        description: 'Elegant leather crossbody bag perfect for everyday use and travel.'
      },
      {
        id: 23,
        name: 'Leather Crossbody Bag',
        price: 95,
        originalPrice: 130,
        category: 'accessories',
        rating: 4.4,
        reviews: 78,
        images: [
            '/photo/9.png',
          '/photo/9.png'
        ],
        badge: 'Trending',
        colors: ['Brown', 'Black', 'Tan'],
        sizes: ['One Size'],
        description: 'Elegant leather crossbody bag perfect for everyday use and travel.'
      },
      {
        id: 24,
        name: 'Leather Crossbody Bag',
        price: 95,
        originalPrice: 130,
        category: 'accessories',
        rating: 4.4,
        reviews: 78,
        images: [
            '/photo/7.png',
          '/photo/8.png'
        ],
        badge: 'Trending',
        colors: ['Brown', 'Black', 'Tan'],
        sizes: ['One Size'],
        description: 'Elegant leather crossbody bag perfect for everyday use and travel.'
      },
      
      
    ]

    const filteredProducts = products.filter(product => {
      if (!product || !product.name || !product.description || !product.category) {
        console.warn('Product with missing data:', product)
        return false
      }
      
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory
      const priceMatch =
        priceRange === 'all' ||
        (priceRange === 'under-100' && product.price < 100) ||
        (priceRange === '100-500' && product.price >= 100 && product.price <= 500) ||
        (priceRange === '500-1000' && product.price > 500 && product.price <= 1000) ||
        (priceRange === 'over-1000' && product.price > 1000)
      const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
      return categoryMatch && priceMatch && searchMatch
    })

    const sortedProducts = (() => {
      try {
        return [...filteredProducts].sort((a, b) => {
          switch (sortBy) {
            case 'price-low':
              return a.price - b.price
            case 'price-high':
              return b.price - a.price
            case 'rating':
              return b.rating - a.rating
            case 'newest':
              return b.id - a.id
            default:
              return 0
          }
        })
      } catch (error) {
        console.error('Error sorting products:', error)
        return filteredProducts
      }
    })()

    const toggleWishlist = (productId: number) => {
      setWishlistItems(prev => 
        prev.includes(productId) 
          ? prev.filter(id => id !== productId)
          : [...prev, productId]
      )
    }



    const getDiscountPercentage = (original: number, current: number) => {
      return Math.round(((original - current) / original) * 100)
    }

    const formatINR = (amount: number) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(amount)
    }

    return (
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">All Products</h1>
              <p className="text-gray-600 text-lg">{filteredProducts.length} products found</p>
            </div>
            <Button variant="outline" className="flex items-center gap-2" disabled>
              <ShoppingCart className="h-5 w-5" />
              View Cart & Checkout
            </Button>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Filter className="h-5 w-5" />
              Filters & Search
            </button>
          </div>

          {/* Mobile Filter Overlay */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
              <div className="fixed inset-y-0 left-0 w-80 bg-white p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Mobile Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Mobile Filters */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Category</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category.id} className="flex items-center">
                          <input
                            type="radio"
                            name="category"
                            value={category.id}
                            checked={selectedCategory === category.id}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="mr-3"
                          />
                          <span className="text-sm">{category.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <div className="space-y-2">
                      {priceRanges.map((range) => (
                        <label key={range.id} className="flex items-center">
                          <input
                            type="radio"
                            name="priceRange"
                            value={range.id}
                            checked={priceRange === range.id}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="mr-3"
                          />
                          <span className="text-sm">{range.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:w-64">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Filters</h3>
                </div>

                {/* Desktop Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Category</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category.id} className="flex items-center cursor-pointer hover:text-blue-600 transition-colors duration-200">
                          <input
                            type="radio"
                            name="category"
                            value={category.id}
                            checked={selectedCategory === category.id}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="mr-3"
                          />
                          <span className="text-sm">{category.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <div className="space-y-2">
                      {priceRanges.map((range) => (
                        <label key={range.id} className="flex items-center cursor-pointer hover:text-blue-600 transition-colors duration-200">
                          <input
                            type="radio"
                            name="priceRange"
                            value={range.id}
                            checked={priceRange === range.id}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="mr-3"
                          />
                          <span className="text-sm">{range.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="flex-1">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Grid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Products Grid/List */}
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'space-y-4'
              }`}>
                {sortedProducts && sortedProducts.length > 0 ? sortedProducts.map((product) => (
                  <Card 
                    key={product.id} 
                    className={`overflow-hidden hover:shadow-xl transition-all duration-300 group ${
                      viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
                    }`}
                  >
                    <div className={`relative ${viewMode === 'list' ? 'sm:w-48' : ''}`}>
                      <img
                        src={product.images && product.images[0] ? product.images[0] : '/photo/t_shirt.png'}
                        alt={product.name}
                        className={`${
                          viewMode === 'list' 
                            ? 'w-full sm:w-48 h-48 sm:h-full object-cover' 
                            : 'w-full h-64 object-cover'
                        } transition-opacity duration-300 group-hover:opacity-0`}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = '/photo/t_shirt.png'
                        }}
                      />
                      <img
                        src={product.images && product.images[1] ? product.images[1] : '/photo/t_shirt.png'}
                        alt={`${product.name} angle`}
                        className={`${
                          viewMode === 'list' 
                            ? 'w-full sm:w-48 h-48 sm:h-full object-cover absolute inset-0' 
                            : 'w-full h-64 object-cover absolute inset-0'
                        } opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = '/photo/t_shirt.png'
                        }}
                      />
                      
                      {/* Badge */}
                      <div className="absolute top-2 left-2">
                        <Badge variant="default">{product.badge}</Badge>
                      </div>
                      
                      {/* Discount Badge */}
                      {product.originalPrice > product.price && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary">
                            -{getDiscountPercentage(product.originalPrice, product.price)}%
                          </Badge>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="absolute bottom-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className={`p-2 rounded-full ${
                            wishlistItems.includes(product.id) 
                              ? 'bg-red-500 text-white' 
                              : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white'
                          } transition-all duration-200`}
                        >
                          <Heart className={`h-4 w-4 ${wishlistItems.includes(product.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button className="p-2 bg-white text-gray-700 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-200">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 bg-white text-gray-700 rounded-full hover:bg-green-500 hover:text-white transition-all duration-200">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className={`flex-1 ${viewMode === 'list' ? 'sm:p-6' : ''}`}>
                      <CardContent className={`${viewMode === 'list' ? 'p-0' : 'p-4'}`}>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
                        </div>
                        
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">{product.rating}</span>
                          <span className="text-sm text-gray-400">({product.reviews})</span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl font-bold text-gray-900">{formatINR(product.price)}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">{formatINR(product.originalPrice)}</span>
                          )}
                        </div>



                        {/* Colors and Sizes */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">Colors:</span>
                            {product.colors && product.colors.slice(0, 3).map((color, index) => (
                              <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {color}
                              </span>
                            ))}
                            {product.colors && product.colors.length > 3 && (
                              <span className="text-xs text-gray-400">+{product.colors.length - 3}</span>
                            )}
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className={`${viewMode === 'list' ? 'p-0' : 'p-4 pt-0'}`}>
                        <div className="flex gap-2 w-full">
                          <Button
                            className="flex-1"
                            size="sm"
                            onClick={() => {
                              addItem({ id: product.id, name: product.name, price: product.price, image: product.images?.[0] })
                              setToastProduct(product.name)
                              setShowToast(true)
                              setTimeout(() => setShowToast(false), 1800)
                            }}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2 animate-bounce" />
                            Add to Cart
                          </Button>
                          <Button variant="outline" size="sm">
                            Quick View
                          </Button>
                        </div>
                      </CardFooter>
                    </div>
                  </Card>
                )) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                    <Button onClick={() => {
                      setSelectedCategory('all')
                      setPriceRange('all')
                      setSearchQuery('')
                    }}>
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <ShoppingCart className="h-5 w-5 animate-bounce" />
          <span className="font-semibold">{toastProduct} added to cart!</span>
        </div>
      )}
      </div>
    )
  } catch (error) {
    console.error("Error in ProductListingPage:", error);
    return (
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">An error occurred</h3>
            <p className="text-gray-600 mb-6">Failed to load product listings.</p>
            <Button onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductListingPage
