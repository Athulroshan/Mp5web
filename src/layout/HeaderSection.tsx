import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, ShoppingCart, Heart, Menu, X, ChevronDown } from 'lucide-react'
import { useCart } from '../context/CartContext'
import Logo from '../components/Logo'

interface NavItem {
  label: string
  to: string
}

const productLinks: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Product', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' }
]

const serviceLinks: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Inspection', to: '/inspection' },
  { label: 'Contact', to: '/contact' }
]

const generalLinks: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Inspection', to: '/inspection' },
  { label: 'Contact', to: '/contact' }
]

const HeaderSection: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { totalItems } = useCart()
  const location = useLocation()
  const isProductSection = location.pathname === '/products' || location.pathname === '/products-page'
  const isServiceSection = location.pathname === '/services-page' || location.pathname === '/inspection'
  const navigationLinks = isProductSection ? productLinks : isServiceSection ? serviceLinks : generalLinks

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
            <Logo className="h-10 w-auto lg:h-12" showText={false} />
          </div>  
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigationLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {isProductSection || isServiceSection ? null : (
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
          )}

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
            {navigationLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                onClick={handleNavClick}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {isProductSection || isServiceSection ? null : (
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
          )}
        </div>
      </div>
    </header>
  )
}

export default HeaderSection 