import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'

const LoginPage: React.FC = () => {
  const { user, login, logout } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    const result = await login(email, password)
    setIsSubmitting(false)

    if (!result.success) {
      setError(result.message)
      return
    }

    navigate('/products')
  }

  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
          <p className="text-gray-600 mb-6">Use your account credentials, or sign in with the admin username <strong>admin</strong>.</p>

          {user ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-700">You are already signed in as <strong>{user.name}</strong>.</p>
              <div className="flex gap-3">
                <Button onClick={() => navigate('/products')}>Go to Products</Button>
                <Button variant="outline" onClick={logout}>Logout</Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3">{error}</div>}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username or Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin or you@example.com"
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
