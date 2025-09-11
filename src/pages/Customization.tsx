import React, { useState } from 'react'
import { Card, CardContent } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

const Customization: React.FC = () => {
  const [outfitType, setOutfitType] = useState<string>('Top')
  const [selectedColor, setSelectedColor] = useState<string>('white')
  const [quantity, setQuantity] = useState<number>(1)
  const [customText, setCustomText] = useState<string>('')
  const [textPlacement, setTextPlacement] = useState<string>('Chest')

  const outfitTypes = ['Top', 'T-Shirt', 'Bottom', 'Both', 'Accessories', 'Full Set']
  const textPlacements = ['Chest', 'Back', 'Sleeve', 'Bottom corner']
  
  const colors = [
    { name: 'white', hex: '#FFFFFF', border: '#E5E7EB' },
    { name: 'black', hex: '#000000', border: '#374151' },
    { name: 'red', hex: '#EF4444', border: '#DC2626' },
    { name: 'blue', hex: '#3B82F6', border: '#2563EB' },
    { name: 'green', hex: '#10B981', border: '#059669' },
    { name: 'yellow', hex: '#F59E0B', border: '#D97706' },
    { name: 'purple', hex: '#8B5CF6', border: '#7C3AED' },
    { name: 'brown', hex: '#A0522D', border: '#8B4513' },
    { name: 'gray', hex: '#6B7280', border: '#4B5563' },
    { name: 'pink', hex: '#EC4899', border: '#DB2777' },
    { name: 'orange', hex: '#F97316', border: '#EA580C' }
  ]

  const getTextPosition = () => {
    switch (textPlacement) {
      case 'Chest':
        return 'absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
      case 'Back':
        return 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
      case 'Sleeve':
        return 'absolute top-1/4 right-4 transform -translate-y-1/2'
      case 'Bottom corner':
        return 'absolute bottom-4 right-4'
      default:
        return 'absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
    }
  }

  const getOutfitShape = () => {
    switch (outfitType) {
      case 'T-Shirt':
        // Use a t-shirt SVG or a more t-shirt-like shape
        return 'tshirt-shape';
      case 'Top':
        return 'w-24 h-32 sm:w-32 sm:h-40 rounded-t-3xl';
      case 'Bottom':
        return 'w-24 h-24 sm:w-32 sm:h-32 rounded-b-3xl';
      case 'Both':
        return 'w-24 h-36 sm:w-32 sm:h-48 rounded-3xl';
      case 'Accessories':
        return 'w-20 h-20 sm:w-24 sm:h-24 rounded-full';
      case 'Full Set':
        return 'w-28 h-44 sm:w-36 sm:h-56 rounded-3xl';
      default:
        return 'w-24 h-32 sm:w-32 sm:h-40 rounded-t-3xl';
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Customize Your Outfit</h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 px-4">Create your perfect piece with our customization tools</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Customization Controls */}
          <div className="space-y-4 sm:space-y-6">
            {/* Outfit Type Selection */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Outfit Type</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {outfitTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setOutfitType(type)}
                      className={`p-2 sm:p-3 rounded-lg border-2 transition-all text-sm sm:text-base min-h-[44px] sm:min-h-[48px] ${
                        outfitType === type
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 active:bg-gray-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Color Selection */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Color Selection</h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all min-h-[44px] sm:min-h-[48px] ${
                        selectedColor === color.name
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-300 hover:border-gray-400 active:scale-95'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quantity Input */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quantity</h3>
                <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400 flex items-center justify-center text-gray-700 font-bold text-lg sm:text-base min-h-[44px] sm:min-h-[40px]"
                  >
                    -
                  </button>
                  <Input
                    type="number"
                    value={quantity.toString()}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 sm:w-24 text-center text-lg sm:text-base"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400 flex items-center justify-center text-gray-700 font-bold text-lg sm:text-base min-h-[44px] sm:min-h-[40px]"
                  >
                    +
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Custom Text Input */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Custom Text</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Text
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your custom text..."
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      className="w-full text-base"
                      maxLength={50}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Text Placement
                    </label>
                    <select
                      value={textPlacement}
                      onChange={(e) => setTextPlacement(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base min-h-[44px]"
                    >
                      {textPlacements.map((placement) => (
                        <option key={placement} value={placement}>
                          {placement}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add to Cart Button */}
            <Button size="lg" className="w-full text-base sm:text-lg py-3 sm:py-4 min-h-[48px] sm:min-h-[52px]">
              Add to Cart - ${(quantity * 29.99).toFixed(2)}
            </Button>
          </div>

          {/* Live Preview */}
          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Live Preview</h3>
                <div className="flex justify-center">
                  <div className="relative bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 w-full max-w-sm">
                    <div
                      className={`${getOutfitShape()} relative mx-auto shadow-md`}
                      style={{ backgroundColor: colors.find(c => c.name === selectedColor)?.hex }}
                    >
                      {outfitType === 'T-Shirt' ? (
                        <svg viewBox="0 0 64 64" className="w-full h-full" style={{ position: 'absolute', top: 0, left: 0 }}>
                          <g>
                            <path d="M8 8 L24 16 L24 56 L40 56 L40 16 L56 8 L48 0 L32 8 L16 0 Z" fill={colors.find(c => c.name === selectedColor)?.hex || '#fff'} stroke="#333" strokeWidth="2" />
                          </g>
                        </svg>
                      ) : null}
                      {customText && (
                        <div
                          className={`${getTextPosition()} text-white font-bold text-xs sm:text-sm px-2 py-1 rounded bg-black bg-opacity-50`}
                          style={{ maxWidth: '60px', wordBreak: 'break-word' }}
                        >
                          {customText}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview Details */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Preview Details</h3>
                <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600">Outfit Type:</span>
                    <span className="font-medium">{outfitType}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600">Color:</span>
                    <span className="font-medium capitalize">{selectedColor}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-medium">{quantity}</span>
                  </div>
                  {customText && (
                    <>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-600">Custom Text:</span>
                        <span className="font-medium truncate ml-2">{customText}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-600">Text Placement:</span>
                        <span className="font-medium">{textPlacement}</span>
                      </div>
                    </>
                  )}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-semibold text-base sm:text-lg">
                      <span>Total Price:</span>
                      <span>${(quantity * 29.99).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Customization 