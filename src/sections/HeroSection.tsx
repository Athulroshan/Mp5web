import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Luxury Fashion
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Explore our exclusive collection of premium clothing and accessories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button variant="secondary" size="lg">
                Shop Now
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 