import React from 'react'

const contacts = [
  'Request Inspection',
  'Book Factory Audit',
  'Request QC Team',
  'Vendor Assessment',
  'International Client Support',
  'Business Development Contact',
  'WhatsApp',
  'Email',
  'Office Address',
  'Working Hours'
]

const ServiceContactPage: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Services Contact</p>
        <h1 className="mt-2 text-4xl font-black text-slate-900">Operations & Inspection Desk</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contacts.map((item) => (
          <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-700 shadow-sm">
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}

export default ServiceContactPage
