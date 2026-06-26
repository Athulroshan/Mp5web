import React from 'react'

const faqs = [
  {
    q: 'What is your MOQ for custom polo manufacturing?',
    a: 'MOQ depends on fabric and trims; most programs start from 100 pieces per color-size ratio.'
  },
  {
    q: 'Can you support recurring school uniform cycles?',
    a: 'Yes. We maintain approved tech packs and repeat-order control sheets for scheduled cycles.'
  },
  {
    q: 'How do you ensure quality consistency?',
    a: 'Inline QC checkpoints, final AQL inspection, and traceable batch documentation are standard.'
  }
]

const ProductFaqPage: React.FC = () => {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black text-slate-900">Products FAQ</h1>
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

export default ProductFaqPage
