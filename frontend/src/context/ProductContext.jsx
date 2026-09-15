import API_BASE_URL from '../config/api'
import {
  createContext,
  useEffect,
  useState
} from 'react'

const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [products, setProducts] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(`${API_BASE_URL}/api/products`)

      if (!response.ok) {
        throw new Error(
          'Failed to load products'
        )
      }

      const data =
        await response.json()

      setProducts(data)
    } catch (error) {
      setError(
        error.message ||
          'Failed to load products'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const addProduct = async (product) => {
    const token =
      localStorage.getItem(
        'shopnest-token'
      )

    const response = await fetch(
      `${API_BASE_URL}/api/products`,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',

          Authorization:
            `Bearer ${token}`
        },

        body: JSON.stringify(product)
      }
    )

    if (!response.ok) {
      throw new Error(
        'Failed to add product'
      )
    }

    const newProduct =
      await response.json()

    setProducts((currentProducts) => [
      ...currentProducts,
      newProduct
    ])

    return newProduct
  }

  const deleteProduct = async (
    productId
  ) => {
    const token =
      localStorage.getItem(
        'shopnest-token'
      )

    const response = await fetch(
      `${API_BASE_URL}/api/products/${productId}`,
      {
        method: 'DELETE',

        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    )

    if (!response.ok) {
      throw new Error(
        'Failed to delete product'
      )
    }

    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) =>
          product.id !== productId
      )
    )
  }

  const updateProduct = async (
    updatedProduct
  ) => {
    const token =
      localStorage.getItem(
        'shopnest-token'
      )

    const response = await fetch(
      `${API_BASE_URL}/api/products/${updatedProduct.id}`,
      {
        method: 'PUT',

        headers: {
          'Content-Type':
            'application/json',

          Authorization:
            `Bearer ${token}`
        },

        body: JSON.stringify(
          updatedProduct
        )
      }
    )

    if (!response.ok) {
      throw new Error(
        'Failed to update product'
      )
    }

    const savedProduct =
      await response.json()

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === savedProduct.id
          ? savedProduct
          : product
      )
    )

    return savedProduct
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
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