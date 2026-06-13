const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

export const productService = {
  // Get all products with filters
  getAllProducts: async (filters?: {
    category?: string
    search?: string
    sort?: string
    featured?: boolean
    trending?: boolean
  }) => {
    try {
      const params = new URLSearchParams()
      if (filters) {
        if (filters.category) params.append('category', filters.category)
        if (filters.search) params.append('search', filters.search)
        if (filters.sort) params.append('sort', filters.sort)
        if (filters.featured) params.append('featured', 'true')
        if (filters.trending) params.append('trending', 'true')
      }

      const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`)
      if (!response.ok) throw new Error('Failed to fetch products')
      return await response.json()
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  },

  // Get single product
  getProduct: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`)
      if (!response.ok) throw new Error('Failed to fetch product')
      return await response.json()
    } catch (error) {
      console.error('Error fetching product:', error)
      throw error
    }
  },

  // Get featured products
  getFeaturedProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/featured`)
      if (!response.ok) throw new Error('Failed to fetch featured products')
      return await response.json()
    } catch (error) {
      console.error('Error fetching featured products:', error)
      throw error
    }
  },

  // Create product (Admin)
  createProduct: async (productData: any, token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      })
      if (!response.ok) throw new Error('Failed to create product')
      return await response.json()
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  },

  // Update product (Admin)
  updateProduct: async (id: string, productData: any, token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      })
      if (!response.ok) throw new Error('Failed to update product')
      return await response.json()
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  },

  // Delete product (Admin)
  deleteProduct: async (id: string, token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (!response.ok) throw new Error('Failed to delete product')
      return await response.json()
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    }
  },

  // Update stock (Admin)
  updateStock: async (id: string, quantity: number, token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}/stock`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ quantity })
      })
      if (!response.ok) throw new Error('Failed to update stock')
      return await response.json()
    } catch (error) {
      console.error('Error updating stock:', error)
      throw error
    }
  },

  // Get low stock products (Admin)
  getLowStockProducts: async (threshold: number = 10, token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/stock/low?threshold=${threshold}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (!response.ok) throw new Error('Failed to fetch low stock products')
      return await response.json()
    } catch (error) {
      console.error('Error fetching low stock products:', error)
      throw error
    }
  },

  // Upload product image (Admin)
  uploadProductImage: async (
    productId: string,
    file: File,
    alt: string,
    token: string
  ) => {
    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('alt', alt)

      const response = await fetch(`${API_BASE_URL}/products/${productId}/upload-image`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })
      if (!response.ok) throw new Error('Failed to upload image')
      return await response.json()
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  },

  // Delete product image (Admin)
  deleteProductImage: async (productId: string, imageId: string, token: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products/${productId}/images/${imageId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (!response.ok) throw new Error('Failed to delete image')
      return await response.json()
    } catch (error) {
      console.error('Error deleting image:', error)
      throw error
    }
  },

  // Add review
  addReview: async (productId: string, reviewData: any, token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(reviewData)
      })
      if (!response.ok) throw new Error('Failed to add review')
      return await response.json()
    } catch (error) {
      console.error('Error adding review:', error)
      throw error
    }
  }
}
