import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'

const ChangePasswordPage: React.FC = () => {
  const { user, changePassword } = useAuth()
  const navigate = useNavigate()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')
    setIsError(false)

    if (newPassword !== confirmPassword) {
      setMessage('New password and confirmation must match.')
      setIsError(true)
      return
    }

    setIsLoading(true)
    const result = await changePassword(oldPassword, newPassword)
    setIsLoading(false)

    if (!result.success) {
      setMessage(result.message)
      setIsError(true)
      return
    }

    setMessage('Password updated successfully. Please sign in again if needed.')
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Change Password</h1>
          <p className="text-gray-600 mb-6">Enter your current password and choose a new password to keep your account secure.</p>

          {message && (
            <div className={`rounded-xl px-4 py-3 text-sm ${isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 outline-none"
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 outline-none"
                required
                minLength={6}
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Updating password...' : 'Update Password'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordPage
