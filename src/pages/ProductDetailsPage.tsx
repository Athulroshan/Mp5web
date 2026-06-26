import React, { useMemo } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import ProductDetail from '../components/ProductDetail'

interface ProductState {
  product?: {
    id: number
    name: string
    description: string
    price: number
    originalPrice: number
    rating: number
    reviews: number
    images: string[]
    colors: string[]
    sizes: string[]
    category: string
    badge?: string
  }
}

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams()
  const location = useLocation()
  const state = location.state as ProductState | null
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const autoOpenCustomize = searchParams.get('customize') === 'true'

  const fallbackProduct = productId
    ? {
        id: Number(productId),
        name: `Product ${productId}`,
        description: 'Premium apparel product from MPSS manufacturing line.',
        price: 450,
        originalPrice: 600,
        rating: 4.7,
        reviews: 120,
        images: ['/photo/t_shirt.png'],
        colors: ['Black', 'White', 'Navy'],
        sizes: ['S', 'M', 'L', 'XL'],
        category: 'apparel',
        badge: 'Featured'
      }
    : undefined

  const product = state?.product ?? fallbackProduct

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="mb-3 text-2xl font-bold text-gray-900">Product details unavailable</h1>
          <p className="mb-6 text-gray-600">
            This product page needs to be opened from the Products section so we can load the selected item.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Products
          </Link>
          {productId ? <p className="mt-4 text-xs text-gray-400">Requested ID: {productId}</p> : null}
        </div>
      </div>
    )
  }

  return (
    <ProductDetail
      id={product.id}
      name={product.name}
      description={product.description}
      price={product.price}
      originalPrice={product.originalPrice}
      rating={product.rating}
      reviews={product.reviews}
      images={product.images.map((url, index) => ({
        url,
        alt: `${product.name} view ${index + 1}`
      }))}
      colors={product.colors}
      sizes={product.sizes}
      sku={`MPSS-${String(product.id).padStart(4, '0')}`}
      stock={120}
      category={product.category}
      badge={product.badge}
      autoOpenCustomize={autoOpenCustomize}
    />
  )
}

export default ProductDetailsPage
