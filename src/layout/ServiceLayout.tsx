import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Globe2, Mail, PhoneCall } from 'lucide-react'

const ServiceLayout: React.FC = () => {
  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'About', to: '/services/about' },
    { label: 'Contact', to: '/services/contact' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-emerald-50/40">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <NavLink to="/services" className="text-lg font-black tracking-wide text-blue-700">
            MPSS Services
          </NavLink>
          <nav className="flex items-center gap-2 sm:gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-semibold transition ${
                    isActive ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-slate-200 bg-gradient-to-r from-slate-900 via-blue-950 to-emerald-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <h3 className="mb-3 text-lg font-bold">Sourcing & Inspection Division</h3>
            <p className="text-sm text-slate-200">
              Apparel sourcing, vendor qualification, production monitoring, and third-party quality inspection for global buyers.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Global Support</h4>
            <ul className="space-y-2 text-sm text-slate-200">
              <li className="flex items-center gap-2"><PhoneCall className="h-4 w-4 text-cyan-300" /> +91 97909 87121</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-cyan-300" /> services@mpss.in</li>
              <li className="flex items-center gap-2"><Globe2 className="h-4 w-4 text-cyan-300" /> International client operations</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Working Hours</h4>
            <p className="text-sm text-slate-200">Mon - Sat: 9:00 AM - 8:00 PM</p>
            <p className="mt-2 text-xs text-slate-300">Services microsite footer</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ServiceLayout
