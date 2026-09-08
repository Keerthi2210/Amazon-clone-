import {
  createContext,
  useState
} from 'react'

const OrderContext = createContext()

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([])

  const addOrder = (order) => {
    setOrders((currentOrders) => [
      order,
      ...currentOrders
    ])
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