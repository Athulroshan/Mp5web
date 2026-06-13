import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type Product = {
  id: number
  name: string
  price: number
  originalPrice: number
  category: string
  rating: number
  reviews: number
  images: string[]
  badge: string
  colors: string[]
  sizes: string[]
  description: string
  stock?: number
}

type ProductContextValue = {
  products: Product[]
  updateProductPrice: (id: number, price: number) => void
  addProduct: (product: Product) => void
}

const ProductContext = createContext<ProductContextValue | undefined>(undefined)

const STORAGE_KEY = 'mpss_products'

const defaultProducts: Product[] = [
  {
    id: 1,
    name: 'Premium Cotton T-Shirt',
    price: 450,
    originalPrice: 1000,
    category: 'shirts',
    rating: 4.8,
    reviews: 124,
    images: ['/photo/1.png', '/photo/1.png'],
    badge: 'Sale',
    colors: ['White', 'Black', 'Navy', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Ultra-soft premium cotton t-shirt with perfect fit and breathable fabric.',
    stock: 50
  },
  {
    id: 2,
    name: 'Classic Denim Jacket',
    price: 450,
    originalPrice: 600,
    category: 'jackets',
    rating: 4.9,
    reviews: 89,
    images: ['/photo/2.png', '/photo/2.png'],
    badge: 'Best Seller',
    colors: ['Blue', 'Black', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Timeless denim jacket with modern fit and premium construction.',
    stock: 30
  },
  {
    id: 3,
    name: 'Elegant Evening Dress',
    price: 320,
    originalPrice: 400,
    category: 'dresses',
    rating: 4.7,
    reviews: 67,
    images: ['/photo/4.png', '/photo/3.png'],
    badge: 'New',
    colors: ['Black', 'Red', 'Navy'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Stunning evening dress perfect for special occasions and formal events.',
    stock: 22
  },
  {
    id: 4,
    name: 'Slim Fit Jeans',
    price: 120,
    originalPrice: 150,
    category: 'pants',
    rating: 4.6,
    reviews: 203,
    images: ['/photo/11.png', '/photo/10.png'],
    badge: 'Popular',
    colors: ['Blue', 'Black', 'Gray'],
    sizes: ['28', '30', '32', '34', '36'],
    description: 'Modern slim fit jeans with stretch comfort and contemporary style.',
    stock: 38
  },
  {
    id: 5,
    name: 'Running Sneakers',
    price: 180,
    originalPrice: 220,
    category: 'shoes',
    rating: 4.5,
    reviews: 156,
    images: ['/photo/20.png', '/photo/19.png'],
    badge: 'Limited',
    colors: ['White', 'Black', 'Red'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    description: 'High-performance running shoes with superior cushioning and support.',
    stock: 45
  },
  {
    id: 6,
    name: 'Leather Crossbody Bag',
    price: 95,
    originalPrice: 130,
    category: 'accessories',
    rating: 4.4,
    reviews: 78,
    images: ['/photo/25.png', '/photo/24.png'],
    badge: 'Trending',
    colors: ['Brown', 'Black', 'Tan'],
    sizes: ['One Size'],
    description: 'Elegant leather crossbody bag perfect for everyday use and travel.',
    stock: 65
  }
]

const loadInitialProducts = (): Product[] => {
  if (typeof window === 'undefined') {
    return defaultProducts
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        return parsed
      }
    }
  } catch {
    // ignore parse errors
  }

  return defaultProducts
}

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(loadInitialProducts)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
    } catch {
      // ignore storage errors
    }
  }, [products])

  const updateProductPrice = (id: number, price: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, price } : product
      )
    )
  }

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev])
  }

  const value = useMemo(
    () => ({ products, updateProductPrice, addProduct }),
    [products]
  )

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export const useProducts = (): ProductContextValue => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider')
  }
  return context
}
