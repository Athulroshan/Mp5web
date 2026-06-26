import React from 'react'

const ManufacturingServicePage: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Services</p>
        <h1 className="mt-2 text-4xl font-black text-slate-900">Manufacturing Monitoring</h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          On-ground production monitoring, capacity checks, milestone reviews, and risk alerts to keep delivery timelines stable.
        </p>
      </div>
    </section>
  )
}

export default ManufacturingServicePage
