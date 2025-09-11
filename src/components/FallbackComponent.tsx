import React from 'react'
import Button from './ui/Button'

interface FallbackComponentProps {
  title?: string
  message?: string
  onRetry?: () => void
  showRetry?: boolean
}

const FallbackComponent: React.FC<FallbackComponentProps> = ({
  title = "Something went wrong",
  message = "We're sorry, but something unexpected happened.",
  onRetry,
  showRetry = true
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-gray-600 mb-4">
          {message}
        </p>
        {showRetry && onRetry && (
          <Button onClick={onRetry}>
            Try Again
          </Button>
        )}
        {showRetry && !onRetry && (
          <Button onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        )}
      </div>
    </div>
  )
}

export default FallbackComponent
