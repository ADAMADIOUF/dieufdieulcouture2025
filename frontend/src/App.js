import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import HeroSlider from './components/HeroSlider'
import Footer from './components/Footer'
const App = () => {
  return (
    <div>
      <Navbar />
      <HeroSlider />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default App
