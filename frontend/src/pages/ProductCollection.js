import { Link } from 'react-router-dom';
import { FaHeart, FaSearch } from 'react-icons/fa';

const products = [
  {
    id: 1,
    title: 'Robe Élégante',
    oldPrice: '150$',
    newPrice: '120$',
    image1:
      'https://i.pinimg.com/736x/81/05/7e/81057ee5b345d68675c7f25312bbf47c.jpg',
    image2:
      'https://i.pinimg.com/736x/0e/7f/98/0e7f98408b6e61c0ba1027beab8a6da4.jpg',
  },
  {
    id: 2,
    title: 'Chemise Homme',
    oldPrice: '100$',
    newPrice: '80$',
    image1:
      'https://i.pinimg.com/736x/23/bc/3e/23bc3e08d1221717124a79643a7d038a.jpg',
    image2:
      'https://i.pinimg.com/474x/bc/11/e1/bc11e1620f9ff4b459abe3359548aa54.jpg',
  },
  {
    id: 3,
    title: 'T-Shirt Enfant',
    oldPrice: '50$',
    newPrice: '40$',
    image1:
      'https://i.pinimg.com/736x/70/52/58/7052585e45ec5d22bafbe35ce0642659.jpg',
    image2:
      'https://i.pinimg.com/474x/63/80/e1/6380e170c7a480b912f08f093f68aa32.jpg',
  },
  {
    id: 4,
    title: 'Veste Homme',
    oldPrice: '200$',
    newPrice: '180$',
    image1:
      'https://i.pinimg.com/736x/1d/54/15/1d54157fece04bfa57ff2b971135df53.jpg',
    image2:
      'https://i.pinimg.com/736x/aa/3b/b8/aa3bb8cd9c54dfc80852173ce9beec9e.jpg',
  },
  {
    id: 5,
    title: 'Pantalon Femme',
    oldPrice: '120$',
    newPrice: '100$',
    image1:
      'https://i.pinimg.com/736x/75/99/9c/75999c1f6aa75fafc06cab4be9d428d0.jpg',
    image2:
      'https://i.pinimg.com/736x/87/c3/61/87c3613ec5db8921df025123cc0c6fb5.jpg',
  },
  {
    id: 6,
    title: 'Tenue Africaine Homme',
    oldPrice: '80$',
    newPrice: '60$',
    image1:
      'https://i.pinimg.com/736x/31/eb/45/31eb45f0dd3fd99bd33995801a046439.jpg',
    image2:
      'https://i.pinimg.com/736x/b7/d9/58/b7d958d8061d365706d6dc2f15de9ab6.jpg',
  },
]

const ProductCollection = () => {
  return (
    <div className='product-collection section-center'>
      <h2>Recent Products</h2>
      <div className='product-grid'>
        {products.map((product) => (
          <div key={product.id} className='product-card'>
            <div className='product-image'>
              <img src={product.image1} alt={product.title} className='image-front' />
              <img src={product.image2} alt={product.title} className='image-hover' />
              <div className='product-icons'>
                <FaHeart className='wishlist-icon' />
               
                <FaSearch className='quick-view-icon' />
              </div>
            </div>
            <div className='product-details'>
              <h3>{product.title}</h3>
              <p className='old-price'>{product.oldPrice}</p>
              <p className='new-price'>{product.newPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCollection;
