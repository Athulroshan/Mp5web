import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, ShoppingCart, Heart, Menu, X, ChevronDown } from 'lucide-react'
import { useCart } from '../context/CartContext'
import Logo from '../components/Logo'

const HeaderSection: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { totalItems } = useCart()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.mobile-menu') && !target.closest('.hamburger-button')) {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Close mobile menu on route change
  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'
    } border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Logo className="h-10 w-auto lg:h-12" showText={true} />
          </div>  
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group">
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <button 
              className="text-gray-400 px-3 py-2 text-sm font-medium cursor-not-allowed opacity-60 flex items-center space-x-1"
              title="Under Development - Coming Soon"
              disabled
            >
              <span>Customization</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            <Link to="/inspection" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group">
              Inspection
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
          
          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200" title="Search">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200" title="Wishlist">
              <Heart className="h-5 w-5" />
            </button>
            <Link to="/cart" className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 relative" title="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden hamburger-button p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden mobile-menu transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible'
        } overflow-hidden`}>
          <nav className="py-4 space-y-2 border-t border-gray-200">
            <Link 
              to="/" 
              className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              onClick={handleNavClick}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              onClick={handleNavClick}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              onClick={handleNavClick}
            >
              About
            </Link>
            <button 
              className="w-full text-left px-3 py-3 text-gray-400 cursor-not-allowed opacity-60 flex items-center justify-between"
              disabled
            >
              <span>Customization</span>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Coming Soon</span>
            </button>
            <Link 
              to="/inspection" 
              className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              onClick={handleNavClick}
            >
              Inspection
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              onClick={handleNavClick}
            >
              Contact
            </Link>
          </nav>
          
          {/* Mobile Action Buttons */}
          <div className="py-4 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-2">
              <button className="flex flex-col items-center p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                <Search className="h-5 w-5 mb-1" />
                <span className="text-xs">Search</span>
              </button>
              <button className="flex flex-col items-center p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                <Heart className="h-5 w-5 mb-1" />
                <span className="text-xs">Wishlist</span>
              </button>
              <Link to="/cart" className="flex flex-col items-center p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 relative">
                <ShoppingCart className="h-5 w-5 mb-1" />
                <span className="text-xs">Cart</span>
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{totalItems}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderSection 