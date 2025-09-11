import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, CheckCircle, TrendingUp } from 'lucide-react'

const HomePage: React.FC = () => {
  const [activeBenefit, setActiveBenefit] = useState(0)

  const benefits = [
    {
      icon: <Star className="h-6 w-6 text-indigo-600" />,
      title: "Made-to-Order",
      description:
        "Every piece is crafted only when you order, eliminating mass production and ensuring uniqueness.",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-indigo-600" />,
      title: "Sustainable Fashion",
      description:
        "By producing only what's needed, we reduce waste and promote eco-conscious fashion choices.",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-indigo-600" />,
      title: "Quality Guaranteed",
      description:
        "Each garment undergoes rigorous inspection for quality, durability, and finishing before delivery.",
    },
  ]

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Custom Apparel / Garment Inspection Made Just for You
          </h1>
          <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto">
            We Make Personalized Garments and Provide Technical and Quality inspection services for Brands and Factories.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/about"
              className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Learn More
            </Link>
            <Link
              to="/contact"
              className="bg-indigo-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition flex items-center"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Apparel & Inspection Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Custom Apparel */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Custom Apparel</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We create <strong>made-to-order clothing</strong> that reflects your exact vision. 
                From fabric selection to color, size, and design details — every piece is 
                <strong> custom-crafted</strong> with no mass production waste.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our approach ensures sustainability while giving you apparel 
                that perfectly matches your personality, brand, or event.
              </p>
            </div>

            {/* Garment Inspection */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Garment Inspection</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We provide <strong>professional garment inspection services</strong>. 
                Each product undergoes strict checks for stitching, fabric durability, sizing accuracy, 
                and finishing quality before reaching you.
              </p>
              <p className="text-gray-600 leading-relaxed">
                This ensures every order meets <strong>international quality standards</strong> — 
                combining personalization with reliability and trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-indigo-600">10K+</p>
              <p className="mt-2 text-gray-600">Unique Orders Delivered</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-indigo-600">95%</p>
              <p className="mt-2 text-gray-600">Customer Satisfaction</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-indigo-600">100%</p>
              <p className="mt-2 text-gray-600">Quality Inspected</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Why Choose Us?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the perfect balance of customization, sustainability, and trust in every order.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl shadow-md transition transform hover:scale-105 duration-300 ${
                  activeBenefit === index ? "bg-indigo-50" : "bg-gray-50"
                }`}
                onMouseEnter={() => setActiveBenefit(index)}
              >
                <div className="flex items-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
