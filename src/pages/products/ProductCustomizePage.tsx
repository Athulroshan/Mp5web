import React from 'react'
import { Link } from 'react-router-dom'
import { Wand2 } from 'lucide-react'

const ProductCustomizePage: React.FC = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="flex items-center gap-3 text-indigo-600">
          <Wand2 className="h-6 w-6" />
          <p className="text-sm font-semibold uppercase tracking-[0.25em]">Products Customize</p>
        </div>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Customize Product Colors</h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          Select a product from the catalog and open its customization panel to preview available fabric colors and request a quote.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:from-indigo-700 hover:to-blue-700"
        >
          Go to Products
        </Link>
      </div>
    </section>
  )
}

export default ProductCustomizePage
