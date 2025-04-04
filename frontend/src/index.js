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
import Shipping from './pages/Shipping'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import WishList from "./pages/WishList"
import PrivateRoute from './components/PrivateRoute'
import About from './components/About'
import MenClothing from './clothings/MenClothing'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import ChildrenClothing from './clothings/ChildrenClothing'
import Contact from './components/Contact'
import Profile from './pages/Profile'
import UserList from './dashboard/UserList'
import UserEdit from './dashboard/UserEdit'
import OrderListScreen from './dashboard/OrderList'
import DashboardScreen from './dashboard/Dashboard'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/search/:keyword' element={<HomePage />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/femmes' element={<WomenClothing />} />
      <Route path='/hommes' element={<MenClothing />} />
      <Route path='/enfants' element={<ChildrenClothing />} />
      <Route path='/product/:id' element={<SingleProduct />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgetPassword />} />
      <Route path='/reset-password/:token' element={<ResetPassword />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/order/:id' element={<Order />} />
        <Route path='/wishlist' element={<WishList />} />
      </Route>
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/dashboard' element={<DashboardScreen />} />
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/userlist' element={<UserList />} />
        <Route path='/admin/user/:id/edit' element={<UserEdit />} />
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
