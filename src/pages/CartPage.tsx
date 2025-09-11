import React from 'react'
import { useCart, formatINR } from '../context/CartContext'
import { Trash2, Plus, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 mb-6">Your cart is empty.</p>
          <Link to="/products" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
              <img src={item.image || '/photo/t_shirt.png'} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">{formatINR(item.price)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button className="px-2 py-1 bg-gray-100 rounded" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-8 text-center">{item.quantity}</span>
                  <button className="px-2 py-1 bg-gray-100 rounded" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{formatINR(item.price * item.quantity)}</div>
                <button className="mt-2 text-red-600 hover:text-red-700 inline-flex items-center gap-1" onClick={() => removeItem(item.id)}>
                  <Trash2 className="h-4 w-4" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>{formatINR(totalPrice)}</span>
            </div>
            <Link to="/checkout" className="mt-6 block w-full text-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">Proceed to Checkout</Link>
            <button className="mt-3 w-full text-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200" onClick={clearCart}>Clear Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage




