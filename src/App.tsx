import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ServicesPage from './pages/ServicesPage'
import ProductListingPage from './pages/ProductListingPage'
import InspectionPage from './pages/InspectionPage'
import ErrorBoundary from './components/ErrorBoundary'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ProductLayout from './layout/ProductLayout'
import ServiceLayout from './layout/ServiceLayout'
import ProductCategoryPage from './pages/products/ProductCategoryPage'
import ProductAboutPage from './pages/products/ProductAboutPage'
import ProductContactPage from './pages/products/ProductContactPage'
import ProductFaqPage from './pages/products/ProductFaqPage'
import ProductCustomizePage from './pages/products/ProductCustomizePage'
import ServiceAboutPage from './pages/services/ServiceAboutPage'
import ServiceContactPage from './pages/services/ServiceContactPage'
import ServiceFaqPage from './pages/services/ServiceFaqPage'
import ApparelSourcingPage from './pages/services/ApparelSourcingPage'
import ManufacturingServicePage from './pages/services/ManufacturingServicePage'
import { CartProvider } from './context/CartContext'

function AppContent() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ErrorBoundary>
            <LandingPage />
          </ErrorBoundary>
        }
      />

      <Route
        path="/products"
        element={
          <ErrorBoundary>
            <ProductLayout />
          </ErrorBoundary>
        }
      >
        <Route
          index
          element={
            <ErrorBoundary>
              <ProductListingPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="category"
          element={
            <ErrorBoundary>
              <ProductCategoryPage />
            </ErrorBoundary>
          }
        />
        <Route
          path=":productId"
          element={
            <ErrorBoundary>
              <ProductDetailsPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="customize"
          element={
            <ErrorBoundary>
              <ProductCustomizePage />
            </ErrorBoundary>
          }
        />
        <Route
          path="about"
          element={
            <ErrorBoundary>
              <ProductAboutPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="contact"
          element={
            <ErrorBoundary>
              <ProductContactPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="faq"
          element={
            <ErrorBoundary>
              <ProductFaqPage />
            </ErrorBoundary>
          }
        />
      </Route>

      <Route
        path="/services"
        element={
          <ErrorBoundary>
            <ServiceLayout />
          </ErrorBoundary>
        }
      >
        <Route
          index
          element={
            <ErrorBoundary>
              <ServicesPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="quality-inspection"
          element={
            <ErrorBoundary>
              <InspectionPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="apparel-sourcing"
          element={
            <ErrorBoundary>
              <ApparelSourcingPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="manufacturing"
          element={
            <ErrorBoundary>
              <ManufacturingServicePage />
            </ErrorBoundary>
          }
        />
        <Route
          path="about"
          element={
            <ErrorBoundary>
              <ServiceAboutPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="contact"
          element={
            <ErrorBoundary>
              <ServiceContactPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="faq"
          element={
            <ErrorBoundary>
              <ServiceFaqPage />
            </ErrorBoundary>
          }
        />
      </Route>

      <Route path="/products-page" element={<Navigate to="/products" replace />} />
      <Route path="/services-page" element={<Navigate to="/services" replace />} />
      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
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