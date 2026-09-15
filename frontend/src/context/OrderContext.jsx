import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

import AuthContext from './AuthContext'

const OrderContext = createContext()

export function OrderProvider({ children }) {
  const { user } =
    useContext(AuthContext)

  const [orders, setOrders] =
    useState([])

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const getToken = () =>
    localStorage.getItem(
      'shopnest-token'
    )

  const fetchOrders = async () => {
    if (!user) {
      setOrders([])
      return
    }

    try {
      setLoading(true)
      setError('')

      const response = await fetch(
        `http://localhost:8080/api/orders/user/${user.id}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      )

      if (!response.ok) {
        throw new Error(
          'Failed to load orders'
        )
      }

      const data =
        await response.json()

      setOrders(data)
    } catch (error) {
      setError(
        error.message ||
          'Failed to load orders'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [user])

  const addOrder = async (order) => {
    const response = await fetch(
      'http://localhost:8080/api/orders',
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',

          Authorization:
            `Bearer ${getToken()}`
        },

        body: JSON.stringify(order)
      }
    )

    if (!response.ok) {
      throw new Error(
        'Failed to place order'
      )
    }

    const savedOrder =
      await response.json()

    setOrders((currentOrders) => [
      savedOrder,
      ...currentOrders
    ])

    return savedOrder
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        fetchOrders,
        addOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export default OrderContext