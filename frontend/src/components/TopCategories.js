import { Link } from 'react-router-dom'


const categories = [
  {
    id: 1,
    title: 'Femmes',
    text: 'Découvrez notre nouvelle collection pour femmes',
    image:
      'https://i.pinimg.com/474x/67/f5/d0/67f5d0600b97c72decfddcb91f19ce98.jpg',
    bgColor: '#FEECE2',
    link: '/femmes',
  },
  {
    id: 2,
    title: 'Hommes',
    text: 'Découvrez notre nouvelle collection pour hommes',
    image:
      'https://i.pinimg.com/736x/42/9a/a0/429aa04f990470c2d90098c2e516fc18.jpg',
    bgColor: '#D3E4CD',
    link: '/hommes',
  },
  {
    id: 3,
    title: 'Enfants',
    text: 'Découvrez notre nouvelle collection pour enfants',
    image:
      'https://i.pinimg.com/736x/49/8d/fa/498dfa02d3eedd75a8169d5908ac8d3e.jpg',
    bgColor: '#FFD3B6',
    link: '/enfants',
  },
  {
    id: 4,
    title: 'New Collections',
    text: 'Découvrez nos dernières collections',
    image:
      'https://i.pinimg.com/474x/63/1b/2d/631b2d23958b0b3ea4aa8c87b56ad5a9.jpg',
    bgColor: '#A7BED3',
    link: '/new',
  },
]

const TopCategories = () => {
  return (
    <div className='section-center'>
      <div className='boutique-container'>
        <h2>Boutique de Vêtements</h2>
        <h3>Dieuf Dieul Couture</h3>
        <p>
          Découvrez nos créations uniques et élégantes, parfaites pour toutes
          les occasions.
        </p>
      </div>

      <div className='categories-container '>
        {categories.map((category) => (
          <div
            key={category.id}
            className='category-card'
            style={{ backgroundColor: category.bgColor }}
          >
            <img
              src={category.image}
              alt={category.title}
              className='category-image'
            />
            <div className='category-content'>
              <h2 className='category-title'>{category.title}</h2>
              <p className='category-text'>{category.text}</p>
              <div className='category-button'>
                <Link to={category.link} className='category-link'>
                  Voir Plus
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopCategories
