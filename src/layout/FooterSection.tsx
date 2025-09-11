import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUp, Heart } from 'lucide-react'

const FooterSection: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({})

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                MPSS
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm lg:text-base">
                Your premier destination for luxury fashion and lifestyle products. 
                We create custom apparel that reflects your unique style and personality.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm">info@mpss.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-sm">+91 9790987121</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-sm">Eden garden , vijayapuram po , mudhalipalayam, Tirupur-641606 ,Tamil Nadu</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="p-2 bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white rounded-full transition-all duration-200 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="lg:col-span-1">
            <div className="md:hidden">
              <button
                onClick={() => toggleSection('quickLinks')}
                className="flex items-center justify-between w-full text-lg font-semibold mb-4 text-left"
              >
                Quick Links
                <span className={`transform transition-transform duration-200 ${expandedSections.quickLinks ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
            </div>
            <h4 className="text-lg font-semibold mb-4 hidden md:block">Quick Links</h4>
            <ul className={`space-y-2 transition-all duration-300 ${
              expandedSections.quickLinks ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 md:max-h-96 md:opacity-100'
            } overflow-hidden`}>
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Products' },
                { to: '/about', label: 'About Us' },
                { to: '/customization', label: 'Customization' },
                { to: '/inspection', label: 'Inspection' },
                { to: '/contact', label: 'Contact' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm lg:text-base block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div className="lg:col-span-1">
            <div className="md:hidden">
              <button
                onClick={() => toggleSection('support')}
                className="flex items-center justify-between w-full text-lg font-semibold mb-4 text-left"
              >
                Support
                <span className={`transform transition-transform duration-200 ${expandedSections.support ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
            </div>
            <h4 className="text-lg font-semibold mb-4 hidden md:block">Support</h4>
            <ul className={`space-y-2 transition-all duration-300 ${
              expandedSections.support ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 md:max-h-96 md:opacity-100'
            } overflow-hidden`}>
              {[
                { href: '#', label: 'Help Center' },
                { href: '#', label: 'Shipping Info' },
                { href: '#', label: 'Returns' },
                { href: '#', label: 'Size Guide' },
                { href: '#', label: 'FAQs' },
                { href: '#', label: 'Live Chat' }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm lg:text-base block py-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <div className="md:hidden">
              <button
                onClick={() => toggleSection('newsletter')}
                className="flex items-center justify-between w-full text-lg font-semibold mb-4 text-left"
              >
                Newsletter
                <span className={`transform transition-transform duration-200 ${expandedSections.newsletter ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
            </div>
            <h4 className="text-lg font-semibold mb-4 hidden md:block">Newsletter</h4>
            <div className={`transition-all duration-300 ${
              expandedSections.newsletter ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 md:max-h-96 md:opacity-100'
            } overflow-hidden`}>
              <p className="text-gray-300 text-sm lg:text-base mb-4">
                Stay updated with our latest collections and exclusive offers.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-8 lg:mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm text-center md:text-left">
              © {currentYear} MPSS. All rights reserved. Made with{' '}
              <Heart className="inline h-4 w-4 text-red-500" /> for our customers.
            </p>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  )
}

export default FooterSection 