import React from 'react'
import { FaHandshake } from 'react-icons/fa' // Optional: You can use this icon or import another one if needed
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Partner = () => {
  const partners = [
    {
      id: 1,
      name: 'Partner 1',
      logo: 'https://seeklogo.com/images/T/tigo-logo-7BEB6079AF-seeklogo.com.png',
    },
    {
      id: 2,
      name: 'Partner 2',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1024px-Orange_logo.svg.png',
    },
    {
      id: 3,
      name: 'Partner 3',
      logo: 'https://media.licdn.com/dms/image/v2/C4E1BAQExdFKt1LU2JQ/company-background_10000/company-background_10000/0/1603743933288/uadb_cover?e=2147483647&v=beta&t=3p8Ay1hVv4z0rQlMTU4cFlz4O4BPdVRRNJJkPet1OUU',
    },
    {
      id: 4,
      name: 'Partner 4',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGPCsfPPar_e04pA3jGdUfk66Re7-jcnvR6w&s',
    },
    {
      id: 5,
      name: 'Partner 5',
      logo: 'https://ecolefrancoarabe.com/wp-content/uploads/2023/03/Ecole-Franco-logo-circle.png',
    },
    {
      id: 6,
      name: 'Partner 6',
      logo: 'https://media.licdn.com/dms/image/v2/C560BAQFzNU3r2aLrwA/company-logo_200_200/company-logo_200_200/0/1662854656622?e=2147483647&v=beta&t=-NgP-1e3ROXD-gBwrJYvrmDsUIoPA6-_4D4cHY1PlKg',
    },
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <section className='partner-section'>
      <div className='partner-title'>
        <h2>Nos Partenaires de Confiance</h2>
        <p>
          Nous collaborons avec les meilleures marques pour offrir les meilleurs
          services.
        </p>
      </div>

      <Slider {...settings} className='partner-slider'>
        {partners.map((partner) => (
          <div className='partner-item' key={partner.id}>
            <img
              src={partner.logo}
              alt={partner.name}
              className='partner-logo'
            />
          </div>
        ))}
      </Slider>
    </section>
  )
}

export default Partner
