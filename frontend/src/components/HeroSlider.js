import { useState, useEffect } from 'react'

const slides = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D',
    title: 'Bienvenue chez Dieuf Dieul Couture',
    description:
      'Découvrez nos créations uniques avec une touche de tradition et de modernité.',
    button: 'Voir Nos Services',
    link: '/services',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D',
    title: 'Style et Élégance',
    description: 'Des vêtements conçus pour chaque occasion spéciale.',
    button: 'Nous Contacter',
    link: '/contact',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNsb3RoaW5nfGVufDB8fDB8fHww',
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
