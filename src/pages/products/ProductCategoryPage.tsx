import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const categories = [
  { name: 'Custom Polo Shirts', description: 'Brand-ready polo programs for teams and retail labels.' },
  { name: 'Corporate Apparel', description: 'Uniform capsules for enterprise, hospitality, and field teams.' },
  { name: 'School Uniforms', description: 'Durable stitched sets with scalable repeat-order management.' },
  { name: 'Bulk Production', description: 'High-volume capacity with strict milestone and QC controls.' }
]

const ProductCategoryPage: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">Products</p>
        <h1 className="mt-2 text-4xl font-black text-slate-900">Product Categories</h1>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {categories.map((category) => (
          <article key={category.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-2xl font-bold text-slate-900">{category.name}</h2>
            <p className="mt-2 text-slate-600">{category.description}</p>
            <Link to="/products" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
              Explore products <ChevronRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProductCategoryPage
