import React, { useState, useEffect } from 'react'
import { Shirt, CheckCircle } from 'lucide-react'

const AboutUsPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Animation on scroll
  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            About My Profile Sourcing Solution
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
            Revolutionizing the apparel industry with custom-made clothing and professional inspection services.
          </p>
        </div>

        {/* NEW: Custom Apparel & Inspection Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20 lg:mb-24">
          {/* Custom Apparel Intro */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <Shirt className="w-6 h-6 text-indigo-600 mr-2" />
              <h3 className="text-2xl font-bold text-gray-900">Custom Apparel</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We specialize in <strong>made-to-order apparel</strong> where every piece 
              is crafted to your unique specifications. No mass production, no inventory waste – 
              only high-quality clothing that reflects your personality and style.
            </p>
          </div>

          {/* Inspection Intro */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
              <h3 className="text-2xl font-bold text-gray-900">Inspection Services</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We provide <strong>third-party garment inspection</strong>. 
              Every order undergoes rigorous checks for stitching, sizing, fabric durability, and finishing. 
              This ensures international quality standards and complete customer satisfaction.
            </p>
          </div>
        </div>

        {/* Stats Section (unchanged) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-20 lg:mb-24">
          {[
            { number: '10K+', label: 'Custom Orders Delivered' },
            { number: '95%', label: 'Customer Satisfaction' },
            { number: '500+', label: 'Inspection Projects Completed' },
            { number: '50+', label: 'Global Partners' },
          ].map((stat, index) => (
            <div 
              key={index} 
              className={`text-center transform transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-600 mb-2">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story + Inspection (your original long content, unchanged) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20 lg:mb-24">
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-base lg:text-lg">
              <p>
                Founded with a vision to transform the apparel industry, My Profile Sourcing Solution 
                emerged from a simple belief: clothing should be as unique as the person wearing it. 
                We recognized that traditional retail models created waste, limited personalization, 
                and disconnected customers from the creation process.
              </p>
              <p>
                Our journey began with a commitment to sustainable, personalized fashion. We built a 
                system that allows customers to design their perfect piece, then craft it specifically 
                for them. This approach eliminates waste, reduces environmental impact, and creates 
                truly meaningful connections between people and their clothing.
              </p>
              <p>
                Today, we serve thousands of customers who appreciate quality, sustainability, and 
                personalization. Every order we receive is a new opportunity to create something 
                extraordinary – something that reflects the unique personality and style of its owner.
              </p>
            </div>

            {/* Inspection Process */}
            <div className="mt-10 border-t pt-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                Our Inspection Process
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Along with custom apparel production, we also specialize in <strong>third-party garment 
                inspection services</strong>. Every product undergoes a strict quality check before it 
                leaves our facility. Our inspection ensures that stitching, fabric quality, sizing, 
                color accuracy, and finishing meet international standards. 
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                By combining <strong>custom apparel manufacturing</strong> with a professional 
                <strong> inspection process</strong>, we guarantee that each piece is not only 
                personalized to your style but also meets the highest level of quality and durability. 
                This dual approach sets us apart and builds trust with both individual customers and 
                business clients worldwide.
              </p>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                alt="Custom Apparel Workshop"
                className="rounded-2xl shadow-2xl w-full h-80 lg:h-96 object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Live Workshop</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AboutUsPage
