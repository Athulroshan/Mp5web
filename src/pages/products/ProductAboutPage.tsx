import React from 'react'

const ProductAboutPage: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white shadow-xl">
        <p className="text-sm uppercase tracking-[0.25em] text-indigo-100">Products About</p>
        <h1 className="mt-2 text-4xl font-black">About Our Products</h1>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-700 shadow-sm md:col-span-2">
          At MPSS Products, we specialize in manufacturing high-quality customized apparel tailored to your requirements. We provide order-based manufacturing for school uniforms, corporate uniforms, event T-shirts, promotional apparel, and custom T-shirts in your desired quantity.
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-700 shadow-sm md:col-span-2">
          In addition to customized manufacturing, we also offer our own branded T-shirt collection. Customers can choose from a variety of colors and sizes to purchase premium-quality ready-made T-shirts.
        </div>
      </div>
    </section>
  )
}

export default ProductAboutPage
