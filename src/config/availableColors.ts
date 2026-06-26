export interface AvailableColorOption {
  id: number
  name: string
  hex: string
  available: boolean
  stock: number
}

export const availableColors: AvailableColorOption[] = [
  { id: 1, name: 'Black', hex: '#000000', available: true, stock: 120 },
  { id: 2, name: 'White', hex: '#F5F5F5', available: true, stock: 95 },
  { id: 3, name: 'Maroon', hex: '#7A1F2B', available: true, stock: 62 },
  { id: 4, name: 'Navy Blue', hex: '#1A2C63', available: true, stock: 88 },
  { id: 5, name: 'Royal Blue', hex: '#1E5EFF', available: true, stock: 73 },
  { id: 6, name: 'Bottle Green', hex: '#0B5D3B', available: true, stock: 51 },
  { id: 7, name: 'Olive Green', hex: '#6B8E23', available: true, stock: 47 },
  { id: 8, name: 'Grey', hex: '#808080', available: true, stock: 84 },
  { id: 9, name: 'Mustard', hex: '#D4A017', available: true, stock: 34 },
  { id: 10, name: 'Red', hex: '#C62828', available: true, stock: 66 }
]
