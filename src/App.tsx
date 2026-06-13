import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import HeaderSection from './layout/HeaderSection'
import FooterSection from './layout/FooterSection'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ServicesPage from './pages/ServicesPage'
import ProductListingPage from './pages/ProductListingPage'
import ContactUsPage from './pages/ContactUsPage'
import AboutUsPage from './pages/AboutUsPage'
import Customization from './pages/Customization'
import InspectionPage from './pages/InspectionPage'
import ErrorBoundary from './components/ErrorBoundary'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import { CartProvider } from './context/CartContext'

function AppContent() {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  return (
    <div className="min-h-screen">
      {!isLandingPage && (
        <ErrorBoundary fallback={null}>
          <HeaderSection />
        </ErrorBoundary>
      )}
      <main className={isLandingPage ? '' : 'pt-16 lg:pt-20'}>
              <Routes>
                <Route path="/" element={
                  <ErrorBoundary>
                    <LandingPage />
                  </ErrorBoundary>
                } />
                <Route path="/home" element={
                  <ErrorBoundary>
                    <HomePage />
                  </ErrorBoundary>
                } />
                <Route path="/products-page" element={
                  <ErrorBoundary>
                    <ProductsPage />
                  </ErrorBoundary>
                } />
                <Route path="/services-page" element={
                  <ErrorBoundary>
                    <ServicesPage />
                  </ErrorBoundary>
                } />
                <Route path="/products" element={
                  <ErrorBoundary>
                    <ProductListingPage />
                  </ErrorBoundary>
                } />
                <Route path="/contact" element={
                  <ErrorBoundary>
                    <ContactUsPage />
                  </ErrorBoundary>
                } />
                <Route path="/about" element={
                  <ErrorBoundary>
                    <AboutUsPage />
                  </ErrorBoundary>
                } />
                <Route path="/customization" element={
                  <ErrorBoundary>
                    <Customization />
                  </ErrorBoundary>
                } />
                <Route path="/inspection" element={
                  <ErrorBoundary>
                    <InspectionPage />
                  </ErrorBoundary>
                } />
                <Route path="/cart" element={
                  <ErrorBoundary>
                    <CartPage />
                  </ErrorBoundary>
                } />
                <Route path="/checkout" element={
                  <ErrorBoundary>
                    <CheckoutPage />
                  </ErrorBoundary>
                } />
              </Routes>
            </main>
      {!isLandingPage && (
        <ErrorBoundary fallback={null}>
          <FooterSection />
        </ErrorBoundary>
      )}
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </ErrorBoundary>
  )
}

export default App 