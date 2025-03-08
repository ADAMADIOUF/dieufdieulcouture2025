import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Provider } from 'react-redux'
import { store } from './store'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Shop from './pages/Shop'
import SingleProduct from './pages/SingleProduct'
import CartPage from './pages/CartPage'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminRoute from './components/AdminRoute'
import ProductListScreen from './dashboard/ProductListScreen'
import ProductEditScreen from './dashboard/ProductEditScreen'
import WomenClothing from './clothings/WomenClothing'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/search/:keyword' element={<HomePage />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/femmes' element={<WomenClothing />} />
      <Route path='/product/:id' element={<SingleProduct />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
      </Route>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
