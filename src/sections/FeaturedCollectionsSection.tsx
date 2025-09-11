import React from 'react'
import { Card, CardContent, CardFooter } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

const FeaturedCollectionsSection: React.FC = () => {
  const collections = [
    {
      id: 1,
      name: 'Bottega Veneta Women Exclusive Series',
      price: '$2,450',
      originalPrice: '$3,200',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=500&fit=crop',
      badge: 'New Arrival'
    },
    {
      id: 2,
      name: 'Luxury Leather Jacket Collection',
      price: '$1,850',
      originalPrice: '$2,400',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
      badge: 'Best Seller'
    },
    {
      id: 3,
      name: 'Premium Silk Dress Series',
      price: '$1,200',
      originalPrice: '$1,600',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop',
      badge: 'Limited Edition'
    },
    {
      id: 4,
      name: 'Designer Handbag Collection',
      price: '$3,100',
      originalPrice: '$3,800',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop',
      badge: 'Exclusive'
    }
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">Featured Collections</h2>
        <p className="text-gray-600 text-center mb-12">Discover our most popular and exclusive product lines</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <Card key={collection.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="default">{collection.badge}</Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {collection.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">{collection.price}</span>
                  <span className="text-sm text-gray-500 line-through">{collection.originalPrice}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" size="sm">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollectionsSection 