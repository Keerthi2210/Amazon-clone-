import {
  createContext,
  useState
} from 'react'

const OrderContext = createContext()

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const savedOrders =
      localStorage.getItem('shopnest-orders')

    return savedOrders
      ? JSON.parse(savedOrders)
      : []
  })

  const addOrder = (order) => {
    setOrders((currentOrders) => {
      const updatedOrders = [
        order,
        ...currentOrders
      ]

      localStorage.setItem(
        'shopnest-orders',
        JSON.stringify(updatedOrders)
      )

      return updatedOrders
    })
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export default OrderContext