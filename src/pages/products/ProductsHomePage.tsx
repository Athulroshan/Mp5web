import React from 'react'
import { Link } from 'react-router-dom'

const productHighlights = [
  'Customized T-Shirts',
  'School Uniforms',
  'Corporate Uniforms',
  'Event & Promotional T-Shirts',
  'Bulk Order Manufacturing',
  'Custom Colors & Sizes',
  'Premium Quality Fabrics',
  'MPSS Branded T-Shirts',
  'Multiple Color Options',
  'Reliable & On-Time Delivery'
]

const ProductsHomePage: React.FC = () => {
  return (
    <div className="pb-12">
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 px-6 py-12 text-white shadow-xl sm:px-10 lg:px-14">
          <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            Custom Apparel & Branded T-Shirts
          </h1>
          <p className="mt-5 max-w-3xl text-base text-indigo-50 sm:text-lg">
            We manufacture high-quality customized apparel for schools, businesses, corporate teams, and events. We also offer our own branded T-shirt collection in a variety of colors and sizes.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {productHighlights.map((item) => (
            <article
              key={item}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="text-base font-semibold text-slate-800">{item}</h2>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
          <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">About Our Products</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            At MPSS Products, we specialize in manufacturing customized garments based on your requirements. Whether you need school uniforms, corporate apparel, event T-shirts, or promotional wear, we provide quality products in your desired quantity.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            In addition to custom manufacturing, we also offer our own branded T-shirt collection. Choose from a range of colors, sizes, and premium fabrics for everyday wear.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 p-7 text-white shadow-lg sm:p-10">
          <h2 className="text-2xl font-black sm:text-3xl">Need Customized Apparel?</h2>
          <p className="mt-3 max-w-3xl text-slate-200">
            Whether you need custom uniforms, corporate wear, event T-shirts, or our branded collection, we're here to help.
          </p>
          <div className="mt-6">
            <Link
              to="/products/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition-all duration-200 hover:bg-blue-50"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductsHomePage
