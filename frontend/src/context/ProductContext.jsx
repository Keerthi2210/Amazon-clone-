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

  const deleteProduct = (productId) => {
    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) =>
          product.id !== productId
      )
    )
  }

  const updateProduct = (updatedProduct) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === updatedProduct.id
          ? updatedProduct
          : product
      )
    )
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext