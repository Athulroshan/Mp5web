import React, { useState, useEffect } from 'react'
import { useCart, formatINR } from '../context/CartContext'
import { CheckCircle, AlertCircle, ArrowLeft, Package } from 'lucide-react'

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart()
  const [form, setForm] = useState({
    fullName: '',
    deliveryAddress: '',
    pinCode: '',
    receiverName: '',
    contactNumber: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [orderDetails, setOrderDetails] = useState<any>(null)

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        // Check if Razorpay is already available
        if (window.Razorpay) {
          setScriptLoaded(true)
          resolve(true)
          return
        }

        // Check if script already exists
        const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')
        if (existingScript) {
          // Wait for it to load
          existingScript.addEventListener('load', () => {
            setScriptLoaded(true)
            resolve(true)
          })
          return
        }

        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.async = true
        script.onload = () => {
          setScriptLoaded(true)
          resolve(true)
        }
        script.onerror = () => {
          console.error('Failed to load Razorpay script')
          resolve(false)
        }
        document.body.appendChild(script)
      })
    }

    loadRazorpayScript()
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full Name is required'
    } else if (form.fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name must be at least 2 characters'
    }

    if (!form.deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Delivery Address is required'
    } else if (form.deliveryAddress.trim().length < 10) {
      newErrors.deliveryAddress = 'Please provide a complete address'
    }

    if (!form.pinCode.trim()) {
      newErrors.pinCode = 'Pin Code is required'
    } else if (!/^\d{6}$/.test(form.pinCode)) {
      newErrors.pinCode = 'Pin Code must be exactly 6 digits'
    }

    if (!form.receiverName.trim()) {
      newErrors.receiverName = 'Receiver Name is required'
    } else if (form.receiverName.trim().length < 2) {
      newErrors.receiverName = 'Receiver Name must be at least 2 characters'
    }

    if (!form.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact Number is required'
    } else if (!/^[6-9]\d{9}$/.test(form.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid 10-digit Indian mobile number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Handle numeric inputs
    if (name === 'pinCode') {
      const numericValue = value.replace(/\D/g, '').slice(0, 6)
      setForm(prev => ({ ...prev, [name]: numericValue }))
    } else if (name === 'contactNumber') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10)
      setForm(prev => ({ ...prev, [name]: numericValue }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if cart is empty
    if (items.length === 0) {
      alert('Your cart is empty. Please add items before checkout.')
      return
    }

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = document.querySelector('.border-red-500') as HTMLElement
      firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    if (!scriptLoaded || !window.Razorpay) {
      alert('Payment gateway is loading. Please wait a moment and try again.')
      return
    }

    setIsSubmitting(true)

    try {
      // Create order summary for description
      const orderItems = items.map(item => `${item.name} (${item.quantity})`).join(', ')
      const orderId = 'ORDER_' + Date.now() // Generate a unique order ID
      
      const options = {
        key: 'rzp_test_YOUR_TEST_KEY', // Replace with your actual test key
        amount: Math.round(totalPrice * 100), // Ensure integer value in paise
        currency: 'INR',
        name: 'MPSS Store',
        description: `Order: ${orderItems}`,
        order_id: orderId, // Optional: You can generate this from your backend
        image: '/photo/Head logo.jpg',
        handler: function (response: any) {
          console.log('Payment Success:', response)
          
          // Store order details for success page
          setOrderDetails({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id || orderId,
            items: [...items],
            total: totalPrice,
            deliveryInfo: { ...form }
          })
          
          setPaymentSuccess(true)
          clearCart()
          
          // You can send order details to your backend here
          // sendOrderToBackend(response, form, items)
        },
        prefill: {
          name: form.fullName,
          contact: form.contactNumber,
        },
        notes: {
          address: form.deliveryAddress,
          pincode: form.pinCode,
          receiver: form.receiverName
        },
        theme: {
          color: '#3B82F6'
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed')
            setIsSubmitting(false)
          }
        }
      }

      const razorpay = new window.Razorpay(options)
      
      razorpay.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error)
        alert(`Payment failed: ${response.error.description || 'Unknown error occurred'}`)
        setIsSubmitting(false)
      })
      
      razorpay.open()
      
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment gateway failed to load. Please refresh the page and try again.')
      setIsSubmitting(false)
    }
  }

  const handleBackToShopping = () => {
    // Use React Router navigation if available, otherwise fallback to window.history
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/' // Fallback to home page
    }
  }

  const handleNewOrder = () => {
    setPaymentSuccess(false)
    setOrderDetails(null)
    setForm({
      fullName: '',
      deliveryAddress: '',
      pinCode: '',
      receiverName: '',
      contactNumber: ''
    })
    setErrors({})
  }

  // Success page
  if (paymentSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-2">
            Thank you for your order. We'll process it shortly and send you updates.
          </p>
          
          {orderDetails?.orderId && (
            <p className="text-sm text-gray-500 mb-8">
              Order ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{orderDetails.orderId}</span>
            </p>
          )}

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
              <Package className="w-5 h-5" />
              Order Summary
            </h2>
            <div className="space-y-3">
              {(orderDetails?.items || items).map((item: any) => (
                <div key={item.id} className="flex justify-between items-center">
                  <span className="text-gray-700">{item.name} × {item.quantity}</span>
                  <span className="font-medium">{formatINR(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Paid</span>
                <span className="text-green-600">{formatINR(orderDetails?.total || totalPrice)}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Delivery Details</h3>
            <div className="text-sm text-blue-800 space-y-1 text-left">
              <p><strong>Receiver:</strong> {orderDetails?.deliveryInfo?.receiverName || form.receiverName}</p>
              <p><strong>Contact:</strong> {orderDetails?.deliveryInfo?.contactNumber || form.contactNumber}</p>
              <p><strong>Address:</strong> {orderDetails?.deliveryInfo?.deliveryAddress || form.deliveryAddress}</p>
              <p><strong>Pin Code:</strong> {orderDetails?.deliveryInfo?.pinCode || form.pinCode}</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button 
              onClick={handleBackToShopping}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </button>
            
            <button 
              onClick={handleNewOrder}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              New Order
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show empty cart message
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-white rounded-lg shadow p-8">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to your cart before proceeding to checkout.</p>
          <button 
            onClick={handleBackToShopping}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={handleBackToShopping}
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Delivery Information
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input 
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Receiver's Name *
                </label>
                <input 
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.receiverName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter receiver's name"
                  name="receiverName"
                  value={form.receiverName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {errors.receiverName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.receiverName}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complete Delivery Address *
              </label>
              <textarea 
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                  errors.deliveryAddress ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="House/Flat No, Street, Area, City, State"
                name="deliveryAddress"
                value={form.deliveryAddress}
                onChange={handleChange}
                rows={3}
                disabled={isSubmitting}
              />
              {errors.deliveryAddress && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.deliveryAddress}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pin Code *
                </label>
                <input 
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.pinCode ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="6-digit pin code"
                  name="pinCode"
                  value={form.pinCode}
                  onChange={handleChange}
                  maxLength={6}
                  disabled={isSubmitting}
                />
                {errors.pinCode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.pinCode}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
                </label>
                <input 
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.contactNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="10-digit mobile number"
                  name="contactNumber"
                  value={form.contactNumber}
                  onChange={handleChange}
                  maxLength={10}
                  disabled={isSubmitting}
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.contactNumber}
                  </p>
                )}
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting || !scriptLoaded}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 font-medium"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing Payment...
                </>
              ) : !scriptLoaded ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Loading Payment Gateway...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Pay {formatINR(totalPrice)}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary Section */}
        <div>
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
              Order Summary
            </h2>
            <div className="space-y-3 max-h-64 overflow-auto">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <span className="font-medium text-gray-900">
                    {formatINR(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-gray-900">Total Amount</span>
                <span className="text-xl font-bold text-blue-600">
                  {formatINR(totalPrice)}
                </span>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              <p>• Secure payment with Razorpay</p>
              <p>• Order confirmation via SMS/Email</p>
              <p>• Free delivery available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage