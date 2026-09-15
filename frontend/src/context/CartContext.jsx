import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import AuthContext from './AuthContext'
import ProductContext from './ProductContext'
import API_BASE_URL from '../config/api'

const CartContext = createContext()

export function CartProvider({ children }) {
  const { user } =
    useContext(AuthContext)

  const { products } =
    useContext(ProductContext)

  const [
    cartRecords,
    setCartRecords
  ] = useState([])

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const getToken = () =>
    localStorage.getItem(
      'shopnest-token'
    )

  const fetchCart = async () => {
    if (!user) {
      setCartRecords([])
      return
    }

    try {
      setLoading(true)
      setError('')

      const response = await fetch(
        `${API_BASE_URL}/api/cart/${user.id}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      )

      if (!response.ok) {
        throw new Error(
          'Failed to load cart'
        )
      }

      const data =
        await response.json()

      setCartRecords(data)
    } catch (error) {
      setError(
        error.message ||
          'Failed to load cart'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [user])

  const cartItems = useMemo(
    () =>
      cartRecords
        .map((cartRecord) => {
          const product =
            products.find(
              (product) =>
                product.id ===
                cartRecord.productId
            )

          if (!product) {
            return null
          }

          return {
            ...product,

            quantity:
              cartRecord.quantity,

            cartItemId:
              cartRecord.id
          }
        })
        .filter(Boolean),
    [cartRecords, products]
  )

  const addToCart = async (product) => {
    if (!user) {
      throw new Error(
        'Please sign in to add products to your cart'
      )
    }

    const response = await fetch(
      `${API_BASE_URL}/api/cart`,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',

          Authorization:
            `Bearer ${getToken()}`
        },

        body: JSON.stringify({
          userId: user.id,
          productId: product.id,
          quantity: 1
        })
      }
    )

    if (!response.ok) {
      throw new Error(
        'Failed to add product to cart'
      )
    }

    const savedCartItem =
      await response.json()

    setCartRecords(
      (currentRecords) => {
        const alreadyExists =
          currentRecords.some(
            (item) =>
              item.productId ===
              savedCartItem.productId
          )

        if (alreadyExists) {
          return currentRecords.map(
            (item) =>
              item.productId ===
              savedCartItem.productId
                ? savedCartItem
                : item
          )
        }

        return [
          ...currentRecords,
          savedCartItem
        ]
      }
    )

    return savedCartItem
  }

  const increaseQuantity = async (
    productId
  ) => {
    const cartItem =
      cartRecords.find(
        (item) =>
          item.productId === productId
      )

    if (!cartItem) {
      return
    }

    const newQuantity =
      cartItem.quantity + 1

    const response = await fetch(
      `${API_BASE_URL}/api/cart/${cartItem.id}?quantity=${newQuantity}`,
      {
        method: 'PUT',

        headers: {
          Authorization:
            `Bearer ${getToken()}`
        }
      }
    )

    if (!response.ok) {
      throw new Error(
        'Failed to update cart quantity'
      )
    }

    const updatedCartItem =
      await response.json()

    setCartRecords(
      (currentRecords) =>
        currentRecords.map(
          (item) =>
            item.id ===
            updatedCartItem.id
              ? updatedCartItem
              : item
        )
    )
  }

  const decreaseQuantity = async (
    productId
  ) => {
    const cartItem =
      cartRecords.find(
        (item) =>
          item.productId === productId
      )

    if (
      !cartItem ||
      cartItem.quantity <= 1
    ) {
      return
    }

    const newQuantity =
      cartItem.quantity - 1

    const response = await fetch(
      `${API_BASE_URL}/api/cart/${cartItem.id}?quantity=${newQuantity}`,
      {
        method: 'PUT',

        headers: {
          Authorization:
            `Bearer ${getToken()}`
        }
      }
    )

    if (!response.ok) {
      throw new Error(
        'Failed to update cart quantity'
      )
    }

    const updatedCartItem =
      await response.json()

    setCartRecords(
      (currentRecords) =>
        currentRecords.map(
          (item) =>
            item.id ===
            updatedCartItem.id
              ? updatedCartItem
              : item
        )
    )
  }

  const removeFromCart = async (
    productId
  ) => {
    const cartItem =
      cartRecords.find(
        (item) =>
          item.productId === productId
      )

    if (!cartItem) {
      return
    }

    const response = await fetch(
      `${API_BASE_URL}/api/cart/item/${cartItem.id}`,
      {
        method: 'DELETE',

        headers: {
          Authorization:
            `Bearer ${getToken()}`
        }
      }
    )

    if (!response.ok) {
      throw new Error(
        'Failed to remove product from cart'
      )
    }

    setCartRecords(
      (currentRecords) =>
        currentRecords.filter(
          (item) =>
            item.id !== cartItem.id
        )
    )
  }

  const clearCart = async () => {
    if (!user) {
      setCartRecords([])
      return
    }

    const response = await fetch(
      `${API_BASE_URL}/api/cart/user/${user.id}`,
      {
        method: 'DELETE',

        headers: {
          Authorization:
            `Bearer ${getToken()}`
        }
      }
    )

    if (!response.ok) {
      throw new Error(
        'Failed to clear cart'
      )
    }

    setCartRecords([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        error,
        fetchCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext