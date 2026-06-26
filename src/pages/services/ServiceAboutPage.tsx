import React from 'react'

const points = [
  'Company sourcing expertise',
  'Apparel sourcing strategy',
  'Vendor management framework',
  'Factory audits and compliance',
  'Quality inspection protocols',
  'Third-party inspection support',
  'Production monitoring services',
  'Supply chain management',
  'Global sourcing support',
  'Mission & Vision'
]

const ServiceAboutPage: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-emerald-600 p-8 text-white shadow-xl">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-100">Services About</p>
        <h1 className="mt-2 text-4xl font-black">Trusted Sourcing and Quality Intelligence</h1>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {points.map((item) => (
          <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-700 shadow-sm">
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}

export default ServiceAboutPage
