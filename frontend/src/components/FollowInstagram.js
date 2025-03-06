import React from 'react'
import Slider from 'react-slick'
import { FaInstagram } from 'react-icons/fa'

// Sample Instagram accounts to follow
const instagramItems = [
  {
    id: 1,
    imgSrc:
      'https://i.pinimg.com/474x/5a/ef/bf/5aefbfcb495f6b178a20fad1b0e0a663.jpg',
    instaLink: 'https://www.instagram.com/username1',
  },
  {
    id: 2,
    imgSrc:
      'https://i.pinimg.com/474x/76/00/83/760083e6ef8d552a620e0c76839d4171.jpg',
    instaLink: 'https://www.instagram.com/username2',
  },
  {
    id: 3,
    imgSrc:
      'https://i.pinimg.com/474x/cd/ba/a1/cdbaa16afa432b3173cbd7a4ca4f3fd2.jpg',
    instaLink: 'https://www.instagram.com/username3',
  },
  {
    id: 4,
    imgSrc:
      'https://i.pinimg.com/474x/11/b7/f2/11b7f24efdd3fa465c293a7033d6b9f7.jpg',
    instaLink: 'https://www.instagram.com/username4',
  },
  {
    id: 5,
    imgSrc:
      'https://i.pinimg.com/474x/6f/04/b9/6f04b9ab190e001f57ded237d5f2890d.jpg',
    instaLink: 'https://www.instagram.com/username5',
  },
]

const FollowInstagram = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  return (
    <div className='follow-instagram-container'>
      {/* Title and Description */}
      <h2 className='slider-title'>Suivez nos comptes Instagram</h2>
      <p className='slider-description'>
        Découvrez nos comptes Instagram et suivez-nous pour plus de contenu !
      </p>

      {/* Slider */}
      <Slider {...settings}>
        {instagramItems.map((item) => (
          <div className='instagram-item' key={item.id}>
            <div className='image-container'>
              <img
                src={item.imgSrc}
                alt='Instagram'
                className='instagram-image'
              />
              <div className='icon-container'>
                <a
                  href={item.instaLink}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaInstagram className='instagram-icon' />
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default FollowInstagram
