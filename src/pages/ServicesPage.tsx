import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Shirt, CheckCircle, Zap, Award, Globe, Users, ChevronRight, X, Send } from 'lucide-react'

// Lazy load components
const ServiceGallery = lazy(() => import('../components/ServiceGallery'))

interface Service {
  id: string
  title: string
  icon: React.ReactNode
  color: string
  shortDescription: string
  overview: string
  keyFeatures: string[]
  benefits: string[]
  industriesServed: string[]
  faqs: Array<{ question: string; answer: string }>
  images: string[]
}

const ServicesPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [showInquiry, setShowInquiry] = useState(false)
  const [inquiryService, setInquiryService] = useState<string>('')

  // Animation on scroll
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Services data
  const services: Service[] = [
    {
      id: 'custom-apparel',
      title: 'Custom Apparel',
      icon: <Shirt className="w-8 h-8 text-indigo-600 mr-3" />,
      color: 'indigo',
      shortDescription: 'Made-to-order apparel crafted to your unique specifications',
      overview: 'We specialize in made-to-order apparel where every piece is crafted to your unique specifications. No mass production, no inventory waste – only high-quality clothing that reflects your personality and style.',
      keyFeatures: [
        'Personalized design and customization',
        'Premium fabric selection',
        'Expert manufacturing partnerships',
        'Quick turnaround times',
        'Quality assurance at every stage',
        'Competitive pricing'
      ],
      benefits: [
        'Eliminates excess inventory and waste',
        'Perfect for seasonal collections',
        'Unique products that stand out in the market',
        'Lower minimum order quantities',
        'Direct control over quality and specifications'
      ],
      industriesServed: [
        'Fashion Brands',
        'Sports Teams',
        'Corporate Uniforms',
        'Event Apparel',
        'Retail Boutiques',
        'Custom Merchandise'
      ],
      faqs: [
        { question: 'What is the minimum order quantity?', answer: 'We offer flexible MOQ starting from 10 pieces for custom orders, depending on the design complexity.' },
        { question: 'How long does production take?', answer: 'Typical production time is 15-20 days from approval of samples. Rush orders available on request.' },
        { question: 'Can I see a sample before production?', answer: 'Yes, we provide detailed samples for approval before mass production begins.' },
        { question: 'What fabrics are available?', answer: 'We work with premium suppliers offering cotton, polyester, blends, and specialty fabrics.' }
      ],
      images: [
        '/photo/apparel-1.jpg',
        '/photo/apparel-2.jpg',
        '/photo/apparel-3.jpg'
      ]
    },
    {
      id: 'quality-inspection',
      title: 'Quality Inspection',
      icon: <CheckCircle className="w-8 h-8 text-green-600 mr-3" />,
      color: 'green',
      shortDescription: 'Third-party garment inspection ensuring international quality standards',
      overview: 'We provide third-party garment inspection. Every order undergoes rigorous checks for stitching, sizing, fabric durability, and finishing. This ensures international quality standards and complete customer satisfaction.',
      keyFeatures: [
        'Comprehensive quality checks',
        'International standards compliance',
        'Detailed inspection reports',
        'Pass/fail assessment system',
        'Expert quality auditors',
        'On-site and remote inspection options'
      ],
      benefits: [
        'Minimize product defects and returns',
        'Ensure customer satisfaction',
        'Maintain brand reputation',
        'Comply with international standards',
        'Reduce quality-related costs',
        'Transparent quality documentation'
      ],
      industriesServed: [
        'E-commerce Companies',
        'Retail Brands',
        'Manufacturers',
        'Import/Export Businesses',
        'Fashion Houses',
        'Sports Equipment Brands'
      ],
      faqs: [
        { question: 'What does your inspection cover?', answer: 'We inspect stitching, fabric quality, sizing accuracy, color consistency, and all finishing details.' },
        { question: 'How long does an inspection take?', answer: 'Standard inspection takes 1-3 days depending on order size. Express inspections available.' },
        { question: 'Do you provide documentation?', answer: 'Yes, detailed inspection reports with photos and recommendations are provided for every order.' },
        { question: 'What are your pricing terms?', answer: 'Pricing is based on order volume and inspection type. We offer competitive rates starting from ₹2 per piece.' }
      ],
      images: [
        '/photo/inspection-1.jpg',
        '/photo/inspection-2.jpg',
        '/photo/inspection-3.jpg'
      ]
    }
  ]

  const manufacturingSteps = [
    { name: 'Design Consultation', icon: '1', description: 'Understand your vision and requirements' },
    { name: 'Fabric Selection', icon: '2', description: 'Choose premium materials' },
    { name: 'Sampling', icon: '3', description: 'Create and approve prototypes' },
    { name: 'Production', icon: '4', description: 'Full-scale manufacturing' },
    { name: 'Quality Check', icon: '5', description: 'Rigorous inspection' },
    { name: 'Packaging', icon: '6', description: 'Professional packaging' },
    { name: 'Delivery', icon: '7', description: 'Timely shipment' }
  ]

  const handleLearnMore = (serviceId: string) => {
    setSelectedService(serviceId)
  }

  const handleInquiry = (serviceName: string) => {
    setInquiryService(serviceName)
    setShowInquiry(true)
  }

  const currentService = services.find(s => s.id === selectedService)

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Our Services
          </h1>
        </div>

        {/* Service Overview Section - Clickable Cards */}
        {!selectedService && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20 lg:mb-24">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleLearnMore(service.id)}
                  className="text-left bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                >
                  <div className="flex items-center mb-6">
                    {service.icon}
                    <h2 className="text-2xl font-bold text-gray-900">{service.title}</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.shortDescription}</p>
                  <div className="flex items-center text-indigo-600 font-semibold group-hover:gap-3 transition-all">
                    <span>Learn More</span>
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </div>
                </button>
              ))}
            </div>



            {/* Manufacturing Process Section */}
            <div className="mb-20 lg:mb-24">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-900">
                Our Manufacturing Process
              </h2>
              
              <div className="bg-white rounded-2xl p-8 sm:p-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 overflow-x-auto pb-4">
                  {manufacturingSteps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center flex-shrink-0">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-white mb-3 ${
                        index % 2 === 0 ? 'bg-indigo-600' : 'bg-green-600'
                      }`}>
                        {step.icon}
                      </div>
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 text-center whitespace-nowrap">{step.name}</h4>
                      <p className="text-xs text-gray-600 text-center mt-1 hidden sm:block max-w-[120px]">{step.description}</p>
                      {index < manufacturingSteps.length - 1 && (
                        <ChevronRight className="hidden lg:block w-5 h-5 text-gray-400 ml-4 -rotate-90 lg:rotate-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inspection Process Section */}
            <div className="bg-indigo-50 rounded-2xl p-8 sm:p-12 lg:p-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
                Our Quality Inspection Process
              </h2>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white font-bold">1</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Stitching Quality Check</h3>
                    <p className="text-gray-600">
                      Every seam is examined for consistency, strength, and precision. We check for loose threads, uneven stitches, and durability.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white font-bold">2</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Fabric & Material Inspection</h3>
                    <p className="text-gray-600">
                      We assess fabric strength, color accuracy, and overall material quality against your specifications.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white font-bold">3</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Sizing & Fit Verification</h3>
                    <p className="text-gray-600">
                      All products are measured against size charts to ensure accurate fit and consistency across batches.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white font-bold">4</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Finishing Details Review</h3>
                    <p className="text-gray-600">
                      We check hems, collars, cuffs, zippers, buttons, and all finishing elements for quality and appearance.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white font-bold">5</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Final Report & Delivery</h3>
                    <p className="text-gray-600">
                      You receive a comprehensive inspection report with pass/fail results and recommendations before shipment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Service Detail View */}
        {selectedService && currentService && (
          <div className="space-y-12 lg:space-y-16">
            {/* Back Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="flex items-center text-indigo-600 hover:text-indigo-700 font-semibold mb-6"
            >
              <ChevronRight className="w-5 h-5 mr-2 rotate-180" />
              Back to Services
            </button>

            {/* Service Title */}
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{currentService.title}</h2>
              <p className="text-lg text-gray-600">{currentService.overview}</p>
            </div>

            {/* Service Gallery */}
            <Suspense fallback={<div className="bg-gray-200 rounded-2xl h-96" />}>
              <ServiceGallery images={currentService.images} serviceName={currentService.title} />
            </Suspense>

            {/* Key Features */}
            <div className="bg-white rounded-2xl p-8 sm:p-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentService.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className={`w-6 h-6 mr-4 mt-1 flex-shrink-0 ${currentService.color === 'indigo' ? 'text-indigo-600' : 'text-green-600'}`} />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl p-8 sm:p-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentService.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <Award className={`w-6 h-6 mr-4 mt-1 flex-shrink-0 ${currentService.color === 'indigo' ? 'text-indigo-600' : 'text-green-600'}`} />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Industries Served */}
            <div className="bg-white rounded-2xl p-8 sm:p-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Industries We Serve</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {currentService.industriesServed.map((industry, index) => (
                  <div key={index} className={`p-4 rounded-lg text-center font-semibold text-white ${currentService.color === 'indigo' ? 'bg-indigo-600' : 'bg-green-600'}`}>
                    {industry}
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl p-8 sm:p-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h3>
              <div className="space-y-6">
                {currentService.faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <h4 className="font-bold text-gray-900 mb-3">{faq.question}</h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Get Started?</h3>
              <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
                Get in touch with our team to discuss how {currentService.title} can benefit your business.
              </p>
              <button
                onClick={() => handleInquiry(currentService.title)}
                className="inline-flex items-center justify-center bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                Request Information
                <Send className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      {showInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Inquiry Form</h3>
              <button
                onClick={() => setShowInquiry(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Service</label>
                <input
                  type="text"
                  value={inquiryService}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  placeholder="Tell us about your requirements..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ServicesPage
