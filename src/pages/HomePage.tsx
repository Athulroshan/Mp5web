import React from 'react'
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/photo/t_shirt.png"
            className="h-full w-full object-cover"
          >
            <source src="/photo/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <section className="relative z-10 flex min-h-screen items-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-300 font-semibold">
              Custom apparel & inspection
            </p>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              My profile sourcing solutions
            </h1>
            <p className="mt-6 text-lg text-gray-200 max-w-2xl mx-auto">
              End-to-end sourcing, manufacturing oversight, and quality inspection support for apparel brands, startups, and custom production partners.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition"
              >
                Services
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold text-white hover:bg-white/20 transition"
              >
                Products
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
