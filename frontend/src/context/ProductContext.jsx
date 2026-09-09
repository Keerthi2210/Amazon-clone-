import {
  createContext,
  useState
} from 'react'

import initialProducts from '../data/products'

const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const savedProducts =
      localStorage.getItem('shopnest-products')

    if (savedProducts) {
      return JSON.parse(savedProducts)
    }

    return initialProducts
  })

  const saveProducts = (updatedProducts) => {
    localStorage.setItem(
      'shopnest-products',
      JSON.stringify(updatedProducts)
    )

    return updatedProducts
  }

  const addProduct = (product) => {
    setProducts((currentProducts) => {
      const updatedProducts = [
        ...currentProducts,
        product
      ]

      return saveProducts(updatedProducts)
    })
  }

  const deleteProduct = (productId) => {
    setProducts((currentProducts) => {
      const updatedProducts =
        currentProducts.filter(
          (product) =>
            product.id !== productId
        )

      return saveProducts(updatedProducts)
    })
  }

  const updateProduct = (updatedProduct) => {
    setProducts((currentProducts) => {
      const updatedProducts =
        currentProducts.map((product) =>
          product.id === updatedProduct.id
            ? updatedProduct
            : product
        )

      return saveProducts(updatedProducts)
    })
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