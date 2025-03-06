import React from 'react'
import TopCategories from '../components/TopCategories'
import ProductCollection from './ProductCollection'
import FirstBanner from '../components/FirstBanner'
import CustomSlider from '../components/CustomSlider'
import Partener from '../components/Partener'
import FollowInstagram from '../components/FollowInstagram'

const HomePage = () => {
  return (
    <div>
      <TopCategories/>
      <ProductCollection/>
      <FirstBanner/>
      <ProductCollection/>
      <CustomSlider/>
      <ProductCollection/>
      <Partener/>
      <FollowInstagram/>
    </div>
  )
}

export default HomePage
