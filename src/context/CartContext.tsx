import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type CartItem = {
	id: number
	name: string
	price: number
	image?: string
	quantity: number
}

type CartContextValue = {
	items: CartItem[]
	addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
	removeItem: (id: number) => void
	updateQuantity: (id: number, quantity: number) => void
	clearCart: () => void
	totalItems: number
	totalPrice: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

const STORAGE_KEY = 'mpss_cart_v1'

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [items, setItems] = useState<CartItem[]>(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY)
			return raw ? JSON.parse(raw) : []
		} catch {
			return []
		}
	})

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
	}, [items])

	const addItem = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
		setItems(prev => {
			const existing = prev.find(i => i.id === item.id)
			if (existing) {
				return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i)
			}
			return [...prev, { ...item, quantity }]
		})
	}

	const removeItem = (id: number) => {
		setItems(prev => prev.filter(i => i.id !== id))
	}

	const updateQuantity = (id: number, quantity: number) => {
		setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i))
	}

	const clearCart = () => setItems([])

	const { totalItems, totalPrice } = useMemo(() => {
		const tItems = items.reduce((sum, i) => sum + i.quantity, 0)
		const tPrice = items.reduce((sum, i) => sum + i.quantity * i.price, 0)
		return { totalItems: tItems, totalPrice: tPrice }
	}, [items])

	const value: CartContextValue = {
		items,
		addItem,
		removeItem,
		updateQuantity,
		clearCart,
		totalItems,
		totalPrice,
	}

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	)
}

export const useCart = (): CartContextValue => {
	const ctx = useContext(CartContext)
	if (!ctx) throw new Error('useCart must be used within a CartProvider')
	return ctx
}

export const formatINR = (amount: number) =>
	new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)




