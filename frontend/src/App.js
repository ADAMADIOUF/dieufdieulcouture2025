import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
const App = () => {
  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <Outlet />
      <ToastContainer />
      <Footer />
    </div>
  )
}

export default App
