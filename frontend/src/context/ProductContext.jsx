import {
  createContext,
  useState
} from 'react'

import initialProducts from '../data/products'

const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [products, setProducts] =
    useState(initialProducts)

  const addProduct = (product) => {
    setProducts((currentProducts) => [
      ...currentProducts,
      product
    ])
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext