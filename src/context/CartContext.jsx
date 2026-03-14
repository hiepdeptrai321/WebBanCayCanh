import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart(prevCart => {
      const isExist = prevCart.find(item => item.productId === product._id)
      if (isExist) {
        return prevCart.map(item =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, {
        productId: product._id,
        productName: product.name,
        productImage: product.images?.[0]?.url || '',
        unitPrice: product.discountPrice || product.price,
        quantity: 1
      }]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return
    setCart(prevCart => prevCart.map(item =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    ))
  }

  const totalPrice = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0)

  return (
    <CartContext.Provider value={{
      cart,
      setCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart phải được dùng trong CartProvider')
  }
  return context
}