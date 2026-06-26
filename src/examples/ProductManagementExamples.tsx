import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductDetail from '../components/ProductDetail'
import { productService } from '../services/productService'

/**
 * Example Product Page Implementation
 * Shows how to integrate ProductDetail component with API and state management
 */
const ProductPageExample: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [wishlist, setWishlist] = useState<number[]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        if (productId) {
          const response = await productService.getProduct(productId)
          setProduct(response.data)
        }
      } catch (err) {
        setError('Failed to load product')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleWishlistToggle = () => {
    if (product) {
      setWishlist((prev) =>
        prev.includes(product.id)
          ? prev.filter((id) => id !== product.id)
          : [...prev, product.id]
      )
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <ProductDetail
      id={product.id}
      name={product.name}
      description={product.description}
      price={product.price}
      originalPrice={product.originalPrice}
      rating={product.ratings?.average || 0}
      reviews={product.ratings?.count || 0}
      images={product.images.map((img: any) => ({
        url: img.url,
        alt: img.alt || product.name
      }))}
      colors={product.colors.map((c: any) => c.name || c)}
      sizes={product.sizes.map((s: any) => s.name || s)}
      sku={product.sku}
      stock={product.stock}
      category={product.category}
      badge={product.badge}
      isWishlisted={wishlist.includes(product.id)}
      onWishlistToggle={handleWishlistToggle}
    />
  )
}

export { ProductPageExample }
