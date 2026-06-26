import React, { useMemo, useState } from 'react'
import { X, Truck, Shirt, BookmarkCheck, FileText, ShoppingCart } from 'lucide-react'
import { availableColors } from '../config/availableColors'
import { useCart } from '../context/CartContext'

interface ProductCustomizationPanelProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: number
    name: string
    price: number
    image: string
    description: string
    category: string
  }
}

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const ProductCustomizationPanel: React.FC<ProductCustomizationPanelProps> = ({
  isOpen,
  onClose,
  product
}) => {
  const { addItem } = useCart()
  const activeColors = useMemo(() => availableColors.filter(color => color.available), [])
  const [selectedColorId, setSelectedColorId] = useState<number>(activeColors[0]?.id ?? 0)
  const [selectedSize, setSelectedSize] = useState<string>('M')
  const [quantity, setQuantity] = useState<number>(1)
  const [saved, setSaved] = useState(false)
  const [quoted, setQuoted] = useState(false)
  const [added, setAdded] = useState(false)

  const selectedColor = activeColors.find(color => color.id === selectedColorId) ?? activeColors[0]

  const estimatedDelivery = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  }, [])

  const fabricInfo = useMemo(() => {
    if (product.category.toLowerCase().includes('shirt')) {
      return '240 GSM combed cotton with anti-pilling finish and reactive-dye wash.'
    }
    if (product.category.toLowerCase().includes('jacket')) {
      return 'Dual-layer structured weave with brushed interior and wrinkle control finish.'
    }
    return 'Premium apparel-grade blend with breathable weave and long-lasting color retention.'
  }, [product.category])

  const saveCustomization = () => {
    const payload = {
      productId: product.id,
      color: selectedColor?.name,
      colorHex: selectedColor?.hex,
      size: selectedSize,
      quantity
    }

    localStorage.setItem(`mpss_custom_${product.id}`, JSON.stringify(payload))
    setSaved(true)
    setTimeout(() => setSaved(false), 1600)
  }

  const addToQuote = () => {
    const quoteItem = {
      productId: product.id,
      productName: product.name,
      color: selectedColor?.name,
      size: selectedSize,
      quantity
    }

    const existing = localStorage.getItem('mpss_quote_items')
    const parsed = existing ? JSON.parse(existing) : []
    localStorage.setItem('mpss_quote_items', JSON.stringify([...parsed, quoteItem]))

    setQuoted(true)
    setTimeout(() => setQuoted(false), 1600)
  }

  const handleAddToCart = () => {
    addItem(
      {
        id: Number(`${product.id}${selectedColor?.id ?? 0}`),
        name: `${product.name} - ${selectedColor?.name ?? 'Custom'}`,
        price: product.price,
        image: product.image
      },
      quantity
    )

    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <div
      className={`fixed inset-0 z-[70] transition-all duration-300 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-slate-950/45 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-2xl bg-gradient-to-b from-white to-slate-50 shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-indigo-600">Premium Customize</p>
              <h2 className="text-xl font-bold text-slate-900">{product.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
              aria-label="Close customization panel"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-600">Live Product Preview</h3>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {selectedColor?.name ?? 'No Color'}
                </span>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[320px] w-full object-contain"
                  onError={(event) => {
                    const target = event.target as HTMLImageElement
                    target.src = '/photo/t_shirt.png'
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-0 transition-colors duration-500"
                  style={{
                    backgroundColor: selectedColor?.hex ?? '#000000',
                    mixBlendMode: 'multiply',
                    opacity: 0.65
                  }}
                />
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-600">Color Swatches</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {activeColors.map((color) => {
                  const selected = color.id === selectedColor?.id
                  return (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColorId(color.id)}
                      className={`rounded-xl border p-2 text-left transition ${
                        selected
                          ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-7 w-7 rounded-full border border-white shadow"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{color.name}</p>
                          <p className="text-xs text-slate-500">Stock: {color.stock}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>

            <div className="grid gap-4 sm:grid-cols-2">
              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-600">Size Selection</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizeOptions.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-lg border px-2 py-2 text-sm font-semibold transition ${
                        selectedSize === size
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-600">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-slate-700 transition hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-lg font-bold text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => Math.min(99, prev + 1))}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-slate-700 transition hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </section>
            </div>

            <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <Shirt className="mt-0.5 h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Fabric Information</p>
                  <p className="text-sm text-slate-600">{fabricInfo}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Estimated Delivery</p>
                  <p className="text-sm text-slate-600">Arrives by {estimatedDelivery}</p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-3 border-t border-slate-200 bg-white px-6 py-5">
            <button
              onClick={saveCustomization}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-300 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
            >
              <BookmarkCheck className="h-4 w-4" />
              {saved ? 'Saved' : 'Save Customization'}
            </button>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                onClick={addToQuote}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <FileText className="h-4 w-4" />
                {quoted ? 'Quote Requested' : 'Request Quote'}
              </button>
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:from-indigo-700 hover:to-blue-700"
              >
                <ShoppingCart className="h-4 w-4" />
                {added ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default ProductCustomizationPanel
