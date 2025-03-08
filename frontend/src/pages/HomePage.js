import React from 'react'
import TopCategories from '../components/TopCategories'
import ProductCollection from './ProductCollection'
import FirstBanner from '../components/FirstBanner'
import CustomSlider from '../components/CustomSlider'
import Partener from '../components/Partener'
import FollowInstagram from '../components/FollowInstagram'
import HeroSlider from '../components/HeroSlider'
import RecentProducts from '../components/RecentProducts'
import PopularProducts from '../components/PopularProducts'
import { useParams } from 'react-router-dom'

const HomePage = () => {
  const { keyword } = useParams() // Get the keyword from the URL params
  return (
    <div>
      {!keyword && <HeroSlider />}
      {!keyword && <TopCategories />}
      {!keyword && <RecentProducts />}
      {!keyword && <FirstBanner />}
      {!keyword && <PopularProducts />}
      {!keyword && <CustomSlider />}
      <ProductCollection keyword={keyword} />{' '}
      {/* Pass the keyword to ProductCollection */}
      {!keyword && <Partener />}
      {!keyword && <FollowInstagram />}
    </div>
  )
}

export default HomePage
