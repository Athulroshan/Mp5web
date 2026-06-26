import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Mail, Phone, Building2 } from 'lucide-react'

const ProductLayout: React.FC = () => {
  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'About', to: '/products/about' },
    { label: 'Contact', to: '/products/contact' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50/30">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <NavLink to="/products" className="text-lg font-black tracking-wide text-indigo-700">
            MPSS Products
          </NavLink>
          <nav className="flex items-center gap-2 sm:gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-semibold transition ${
                    isActive ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
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

      <footer className="mt-16 border-t border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <h3 className="mb-3 text-lg font-bold">Garment Manufacturing Division</h3>
            <p className="text-sm text-slate-200">
              Premium apparel manufacturing for polo t-shirts, corporate uniforms, school uniforms, and bulk production programs.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">Support</h4>
            <ul className="space-y-2 text-sm text-slate-200">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-indigo-300" /> +91 97909 87121</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-indigo-300" /> products@mpss.in</li>
              <li className="flex items-center gap-2"><Building2 className="h-4 w-4 text-indigo-300" /> Tirupur Garment Cluster, Tamil Nadu</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">Business Hours</h4>
            <p className="text-sm text-slate-200">Mon - Sat: 9:00 AM - 7:00 PM</p>
            <p className="mt-2 text-xs text-slate-300">Products microsite footer</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ProductLayout
