import React from 'react'

const ProductContactPage: React.FC = () => {
  const items = [
    'Bulk Order Enquiry',
    'Product Catalogue Request',
    'MOQ Enquiry',
    'Custom Uniform Request',
    'Sales Team Contact',
    'WhatsApp',
    'Email',
    'Factory Address',
    'Business Hours'
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">Products Contact</p>
        <h1 className="mt-2 text-4xl font-black text-slate-900">Manufacturing Sales Desk</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-700 shadow-sm">
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductContactPage
