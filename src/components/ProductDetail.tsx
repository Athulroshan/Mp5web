import React, { useState, useRef } from 'react'
import { Heart, Share2, Truck, RotateCcw, Shield, Star, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import Button from './ui/Button'
import { useCart } from '../context/CartContext'
import ProductCustomizationPanel from './ProductCustomizationPanel'

interface ProductImage {
  url: string
  alt: string
}

interface ProductDetailProps {
  id: number
  name: string
  description: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  images: ProductImage[]
  colors: string[]
  sizes: string[]
  sku: string
  stock: number
  category: string
  badge?: string
  isWishlisted?: boolean
  onWishlistToggle?: () => void
  autoOpenCustomize?: boolean
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  id,
  name,
  description,
  price,
  originalPrice,
  rating,
  reviews,
  images,
  colors,
  sizes,
  sku,
  stock,
  category,
  badge,
  isWishlisted = false,
  onWishlistToggle,
  autoOpenCustomize = false
}) => {
  const { addItem } = useCart()
  const [mainImageIndex, setMainImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(colors[0] || '')
  const [selectedSize, setSelectedSize] = useState(sizes[0] || '')
  const [zoomedImage, setZoomedImage] = useState<number | null>(null)
  const [showThumbnails, setShowThumbnails] = useState(true)
  const imageZoomRef = useRef<HTMLDivElement>(null)
  const [addedToCart, setAddedToCart] = useState(false)
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(autoOpenCustomize)

  const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      image: images[0]?.url || '/photo/t_shirt.png',
      quantity,
      color: selectedColor,
      size: selectedSize
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleMouseZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageZoomRef.current) return
    const rect = imageZoomRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    imageZoomRef.current.style.transformOrigin = `${x}% ${y}%`
  }

  const stockStatus = stock > 10 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock'
  const stockColor = stock > 10 ? 'text-green-600' : stock > 0 ? 'text-yellow-600' : 'text-red-600'

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <span>Home</span>
          <span>/</span>
          <span className="capitalize">{category}</span>
          <span>/</span>
          <span className="font-medium text-gray-900">{name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div
              ref={imageZoomRef}
              className="relative overflow-hidden rounded-3xl bg-gray-50 aspect-square group cursor-zoom-in"
              onMouseMove={handleMouseZoom}
              onMouseEnter={() => setZoomedImage(mainImageIndex)}
              onMouseLeave={() => setZoomedImage(null)}
            >
              <img
                src={images[mainImageIndex]?.url || '/photo/t_shirt.png'}
                alt={images[mainImageIndex]?.alt || name}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  zoomedImage === mainImageIndex ? 'scale-150' : 'scale-100'
                }`}
              />
              
              {badge && (
                <div className="absolute top-4 left-4 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {badge}
                </div>
              )}

              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  -{discount}%
                </div>
              )}

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setMainImageIndex((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setMainImageIndex((i) => (i + 1) % images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 right-4 bg-white/80 p-2 rounded-lg">
                <ZoomIn className="h-5 w-5 text-gray-600" />
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      idx === mainImageIndex
                        ? 'border-indigo-600 ring-2 ring-indigo-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{name}</h1>
                <button
                  onClick={onWishlistToggle}
                  className={`flex-shrink-0 p-3 rounded-full transition-all ${
                    isWishlisted
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">{rating}</span>
                <span className="text-gray-600">({reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">₹{price.toLocaleString('en-IN')}</span>
                {originalPrice > price && (
                  <span className="text-xl text-gray-500 line-through">₹{originalPrice.toLocaleString('en-IN')}</span>
                )}
              </div>
              <p className="text-sm text-gray-600">Inclusive of all taxes</p>
            </div>

            {/* Product Meta */}
            <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 mb-1">SKU</p>
                <p className="font-mono font-semibold text-gray-900">{sku}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Stock</p>
                <p className={`font-semibold ${stockColor}`}>{stockStatus}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>

            {/* Selection Options */}
            <div className="mb-6 space-y-6">
              {/* Colors */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Color: <span className="font-normal text-gray-600">{selectedColor}</span>
                </label>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full border-2 font-medium transition-all ${
                        selectedColor === color
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Size: <span className="font-normal text-gray-600">{selectedSize}</span>
                </label>
                <div className="flex gap-3 flex-wrap">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full border-2 font-medium transition-all ${
                        selectedSize === size
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Quantity</label>
                <div className="flex items-center gap-3 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                    disabled={quantity >= stock}
                    className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button
                className="flex-1 h-14 text-base"
                onClick={handleAddToCart}
                disabled={stock === 0}
              >
                {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
              </Button>
              <Button
                variant="secondary"
                className="h-14"
                onClick={() => setIsCustomizeOpen(true)}
              >
                Customize
              </Button>
              <Button variant="outline" className="h-14 flex items-center justify-center gap-2">
                <Share2 className="h-5 w-5" />
                Share
              </Button>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Truck className="h-5 w-5 text-indigo-600" />
                <span>Free shipping on orders above ₹500</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <RotateCcw className="h-5 w-5 text-indigo-600" />
                <span>30-day easy returns & exchanges</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Shield className="h-5 w-5 text-indigo-600" />
                <span>Secure payments & 100% authentic products</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="font-semibold text-gray-900 mb-2">Great quality and fit!</p>
                <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ProductCustomizationPanel
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        product={{
          id,
          name,
          price,
          image: images[mainImageIndex]?.url || images[0]?.url || '/photo/t_shirt.png',
          description,
          category
        }}
      />
    </div>
  )
}

export default ProductDetail
