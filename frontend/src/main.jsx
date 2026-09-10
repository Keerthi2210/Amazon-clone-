import { StrictMode } from 'react'

import {
  createRoot
} from 'react-dom/client'

import {
  BrowserRouter
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import App from './App.jsx'

import {
  AuthProvider
} from './context/AuthContext'

import {
  ProductProvider
} from './context/ProductContext'

import {
  CartProvider
} from './context/CartContext'

import {
  OrderProvider
} from './context/OrderContext'

import {
  NotificationProvider
} from './context/NotificationContext'

createRoot(
  document.getElementById('root')
).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>
              <NotificationProvider>
                <App />
              </NotificationProvider>
            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)