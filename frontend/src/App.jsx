import Cart from './pages/Cart'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import OrderSuccess from './pages/OrderSuccess'
import AdminDashboard from './pages/AdminDashboard'
import AdminProducts from './pages/AdminProducts'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import AdminOrders from './pages/AdminOrders'
function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/orders"
          element={<Orders />}
        />
        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
        <Route
          path="/admin/products"
          element={<AdminProducts />}
        />
        <Route
          path="/admin/products/add"
          element={<AddProduct />}
        />
        <Route
          path="/admin/products/edit/:id"
          element={<EditProduct />}
        />
        <Route
          path="/admin/orders"
          element={<AdminOrders />}
        />
        
      </Routes>
    </>
  )
}

export default App