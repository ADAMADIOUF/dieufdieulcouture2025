import { useState, useEffect } from 'react'

const slides = [
  {
    id: 1,
    image:
      'https://i.pinimg.com/474x/50/51/5f/50515f530daa7bb3d87ab5952088022e.jpg',
    title: 'Bienvenue chez Dieuf Dieul Couture',
    description:
      'Découvrez nos créations uniques avec une touche de tradition et de modernité.',
    button: 'Voir Nos Services',
    link: '/services',
  },
  {
    id: 2,
    image:
      'https://i.pinimg.com/474x/3f/1f/d3/3f1fd347dad5ed16e4d507d369874a51.jpg',
    title: 'Style et Élégance',
    description: 'Des vêtements conçus pour chaque occasion spéciale.',
    button: 'Nous Contacter',
    link: '/contact',
  },
  {
    id: 3,
    image:
      'https://i.pinimg.com/474x/93/e4/f2/93e4f260d05ef918f30316c33a02ef7e.jpg',
    title: 'Qualité Artisanale',
    description: 'Chaque pièce est fabriquée avec soin et expertise.',
    button: 'Prendre Rendez-vous',
    link: '/book',
  },
]

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000) // 5 seconds autoplay
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='hero-slider'>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className='slide-overlay'></div>
          <div className='slide-content'>
            <h2 className='slide-title'>{slide.title}</h2>
            <p className='slide-description'>{slide.description}</p>
            <a href={slide.link} className='slide-button'>
              {slide.button}
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

export default HeroSlider
