import {
  createContext,
  useState
} from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const addToCart = (product) => {
        setCartItems((currentItems) => [
            ...currentItems,
            {
            ...product,
            quantity: 1
            }
        ])
    }
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart
      }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext