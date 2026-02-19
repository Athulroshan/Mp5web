import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HeaderSection from './layout/HeaderSection'
import FooterSection from './layout/FooterSection'
import HomePage from './pages/HomePage'
import ProductListingPage from './pages/ProductListingPage'
import ContactUsPage from './pages/ContactUsPage'
import AboutUsPage from './pages/AboutUsPage'
import Customization from './pages/Customization'
import InspectionPage from './pages/InspectionPage'
import ErrorBoundary from './components/ErrorBoundary'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <Router>
          <div className="min-h-screen">
            <ErrorBoundary fallback={null}>
              <HeaderSection />
            </ErrorBoundary>
            <main className="pt-16 lg:pt-20">
              <Routes>
                <Route path="/" element={
                  <ErrorBoundary>
                    <HomePage />
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
            <ErrorBoundary fallback={null}>
              <FooterSection />
            </ErrorBoundary>
          </div>
        </Router>
      </CartProvider>
    </ErrorBoundary>
  )
}

export default App 