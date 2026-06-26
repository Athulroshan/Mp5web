import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Zap, CheckCircle } from 'lucide-react'

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-200 to-pink-200 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative overflow-hidden">
      
      {/* Decorative Elements - Top Left */}
      <div className="absolute top-10 left-8 opacity-30">
        <svg className="w-24 h-24 text-indigo-600" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M30 20L70 20M25 30L40 80M75 30L60 80M52 30L52 80M48 30L48 80" strokeLinecap="round" />
        </svg>
      </div>

      {/* Decorative Elements - Top Right */}
      <div className="absolute top-20 right-10 opacity-30">
        <svg className="w-20 h-20 text-purple-600" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="50" r="45" />
          <path d="M50 20V80M20 50H80" strokeLinecap="round" />
          <circle cx="50" cy="50" r="10" fill="currentColor" />
        </svg>
      </div>

      {/* Decorative Elements - Bottom Left */}
      <div className="absolute bottom-20 left-10 opacity-30 rotate-45">
        <svg className="w-28 h-28 text-pink-600" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 50Q50 20 80 50Q50 80 20 50" />
          <path d="M35 50Q50 35 65 50Q50 65 35 50" />
        </svg>
      </div>

      {/* Decorative Elements - Bottom Right */}
      <div className="absolute bottom-10 right-8 opacity-30">
        <svg className="w-32 h-32 text-blue-600" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M30 20L70 20L85 50L70 80L30 80L15 50Z" />
          <line x1="50" y1="20" x2="50" y2="80" />
          <line x1="30" y1="50" x2="70" y2="50" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto text-center w-full relative z-10">
        
        {/* Title */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-indigo-900 leading-tight tracking-tight">
            My Profile
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Sourcing Solutions
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="mb-12 sm:mb-16 lg:mb-20 px-2">
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 font-light">
            Custom Apparel & Quality Inspection Services
          </p>
          <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center mb-16 sm:mb-20 lg:mb-24 px-2">
          {/* Products Button */}
          <Link
            to="/products"
            className="w-full sm:w-auto group flex items-center justify-center gap-3 rounded-full bg-white text-indigo-900 px-10 sm:px-12 lg:px-14 py-4 sm:py-5 text-base sm:text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 group-hover:rotate-12 transition-transform" />
            <span>Products</span>
          </Link>

          {/* Services Button */}
          <Link
            to="/services"
            className="w-full sm:w-auto group flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 sm:px-12 lg:px-14 py-4 sm:py-5 text-base sm:text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Zap className="w-6 h-6 sm:w-7 sm:h-7 group-hover:rotate-12 transition-transform" />
            <span>Services</span>
          </Link>
        </div>

        {/* Taglines */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-sm sm:text-base font-semibold text-gray-700 px-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0" />
            <span>Quality You Can Wear</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-gray-400"></div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <span>Trust You Can Rely On</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-gray-400"></div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
            <span>On-Time. Every Time.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
