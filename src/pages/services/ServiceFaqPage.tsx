import React from 'react'

const faqs = [
  {
    q: 'How quickly can an inspection team be deployed?',
    a: 'Deployment depends on geography and scope; urgent requests can be initiated within 24 to 48 hours.'
  },
  {
    q: 'Do you support third-party final random inspections?',
    a: 'Yes. We offer inline and final random inspections with structured photographic reporting.'
  },
  {
    q: 'Can you monitor production at multiple factories?',
    a: 'Yes. We run centralized dashboards and field coordination for multi-factory programs.'
  }
]

const ServiceFaqPage: React.FC = () => {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black text-slate-900">Services FAQ</h1>
      <div className="mt-8 space-y-4">
        {faqs.map((faq) => (
          <article key={faq.q} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">{faq.q}</h2>
            <p className="mt-2 text-slate-600">{faq.a}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ServiceFaqPage
