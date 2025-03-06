import React from 'react'
import Slider from 'react-slick'
import {
  FaHeadset,
  FaClock,
  FaMoneyBillWave,
  FaUserShield,
  FaPhoneAlt,
  FaShippingFast,
  FaQuestionCircle,
} from 'react-icons/fa'

const sliderItems = [
  { icon: <FaHeadset />, title: 'Support Client 24/7' },
  { icon: <FaClock />, title: 'Disponible à tout moment' },
  { icon: <FaMoneyBillWave />, title: 'Prix Abordables' },
  { icon: <FaUserShield />, title: 'Transactions Sécurisées' },
  { icon: <FaPhoneAlt />, title: 'Contact Instantané' },
  { icon: <FaShippingFast />, title: 'Livraison Rapide' },
  { icon: <FaQuestionCircle />, title: 'Questions Fréquemment Posées' },
]

const CustomSlider = () => {
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop through slides
    speed: 500, // Animation speed
    slidesToShow: 3, // Number of items shown at once
    slidesToScroll: 1, // Number of items scrolled at a time
    autoplay: true, // Auto play enabled
    autoplaySpeed: 3000, // Time between auto plays (3 seconds)
    responsive: [
      {
        breakpoint: 1024, // Medium devices (like tablets)
        settings: {
          slidesToShow: 2, // 2 items shown on tablets
        },
      },
      {
        breakpoint: 768, // Mobile devices
        settings: {
          slidesToShow: 1, // 1 item shown on mobile
        },
      },
    ],
  }

  return (
    <div className='slider-container'>
      <Slider {...settings}>
        {sliderItems.map((item, index) => (
          <div key={index} className='slider-item'>
            <div className='icon'>{item.icon}</div>
            <h3>{item.title}</h3>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default CustomSlider
