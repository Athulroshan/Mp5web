import React, { useState, useEffect } from 'react'
import { Phone, Clock, MessageCircle, Users, Star, Zap, Shield, ArrowRight, Globe, CheckCircle, FileText } from 'lucide-react'
import ContactFormSection from '../sections/ContactFormSection'

const ContactUsPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  

  const whyChooseUs = [
    {
      icon: Zap,
      title: 'Lightning Fast Response',
      description: 'Get answers within 2 hours during business hours'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Connect with our fashion and customization specialists'
    },
    {
      icon: Shield,
      title: 'Secure Communication',
      description: 'Your information is protected with enterprise-grade security'
    },
    {
      icon: Star,
      title: 'Premium Support',
      description: 'Dedicated support for all your custom apparel needs'
    }
  ]

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-20 sm:py-24 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <MessageCircle className="h-4 w-4 mr-2" />
                We're Here to Help
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                Let's Create Something
                <span className="block text-blue-200 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Amazing Together
                </span>
              </h1>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed">
                Ready to bring your custom apparel vision to life? Our team of experts is here to guide you 
                through every step of the process. From initial concept to final delivery, we're committed to 
                making your experience exceptional.
              </p>
            </div>
            
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="#contact-form" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-200 hover:scale-105 group">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-200" />
                </a>
                <a href="#contact-form" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 hover:scale-105 group">
                  Contact Form
                  <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Support */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MPSS Support?
              </span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another customer service team. We're your partners in creating 
              exceptional custom apparel that tells your unique story.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {whyChooseUs.map((feature, index) => (
              <div 
                key={index} 
                className={`text-center group transition-all duration-1000 delay-${300 + index * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Global Presence */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              <Globe className="h-4 w-4 mr-2" />
              Global Reach
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Serving Customers{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Worldwide
              </span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              With offices across multiple time zones, we ensure you get the support you need 
              when you need it, regardless of where you are in the world.
            </p>
          </div>
          
          {/* Brand Scrolling Banner */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative overflow-hidden">
              {/* Scrolling Container */}
              <div className="flex animate-scroll space-x-8 py-8">
                {/* Brand Items - Duplicated for seamless loop */}
                {[
                  { name: 'Anlon', logo: '/photo/Anlon.png' },
                  { name: 'BCC', logo: '/photo/concer.png' },
                  { name: 'concerto', logo: '/photo/T-shirt.png' },
                  { name: 'Under Armour', logo: '/photo/white t-shirt.png' },
                  { name: 'Reebok', logo: '/photo/gym t-shirt.png' },
                  { name: 'New Balance', logo: '/photo/full sleeve t-shirt.png' },
                  { name: 'Nike', logo: '/photo/Head logo.jpg' },
                ].map((brand, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0 w-48 h-32 bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="w-20 h-20 mb-3 overflow-hidden rounded-lg">
                      <img 
                        src={brand.logo} 
                        alt={`${brand.name} logo`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = '/photo/Head logo.jpg'
                        }}
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 text-center">{brand.name}</h3>
                  </div>
                ))}
              </div>
              
              {/* Gradient Overlays for smooth edges */}
              <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
            </div>
            
            {/* Additional Info */}
            <div className="text-center mt-8">
              <p className="text-gray-600 text-sm">
                Trusted by leading brands worldwide for custom apparel solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inspection & Quality Assurance */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              <CheckCircle className="h-4 w-4 mr-2" />
              Inspection & QA
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Dedicated <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Inspection</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              We ensure every batch meets your standards with post-production inspection, detailed
              reporting, and compliance checks before shipment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 text-center">
              <Shield className="h-10 w-10 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Compliance Ready</h3>
              <p className="text-gray-600">Verified against safety and international standards.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 text-center">
              <FileText className="h-10 w-10 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Reports</h3>
              <p className="text-gray-600">Actionable inspection reports with findings and remedies.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 text-center">
              <Clock className="h-10 w-10 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Post-Production</h3>
              <p className="text-gray-600">Performed after production to avoid shipment delays.</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <a href="#contact-form" className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-200 hover:scale-105">
              For Inspection
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ready to Start Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Custom Journey?
              </span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Tell us about your vision, and let's create something extraordinary together. 
              Our team is excited to help you bring your custom apparel ideas to life.
            </p>
          </div>
          
          <ContactFormSection />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Let's Create Something{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Extraordinary
              </span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
              Your custom apparel journey starts with a simple conversation. 
              Reach out today and discover how we can transform your ideas into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#contact-form" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-200 hover:scale-105 group">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a href="tel:+15551234567" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 hover:scale-105 group">
                Call Now
                <Phone className="ml-2 h-5 w-5 inline group-hover:scale-110 transition-transform duration-200" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactUsPage
