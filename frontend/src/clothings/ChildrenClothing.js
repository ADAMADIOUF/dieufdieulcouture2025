import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { useGetProductsClothingQuery } from '../slices/productApiSlice'
import Error from '../components/Error'
import Loader from '../components/Loading'
import { FaHeart, FaSearch } from 'react-icons/fa'
import FormatCurrency from '../components/FormatCurrency'

const ChildrenClothing = () => {
  const { data, isLoading: loading, error } = useGetProductsClothingQuery()

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Error />
  }

  if (!data) {
    return <p>No data available.</p>
  }

  const childrenClothingProducts = data.products.filter(
    (product) =>
      product.category === 'clothing' && product.subcategory === 'children'
  )

  return (
    <div className='section-center'>
      <h2 className='section-title'>Collection de Vêtements pour Enfants</h2>
      <p className='section-description'>
        Découvrez notre collection de vêtements pour enfants, alliant confort et
        style pour tous les âges.
      </p>

      <div className='product-grid'>
        {childrenClothingProducts.length === 0 ? (
          <p>Aucun vêtement pour enfants disponible.</p>
        ) : (
          childrenClothingProducts.map((product) => (
            <div key={product._id} className='product-card'>
              <div className='product-image'>
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className='image-front'
                  />
                  {product.images[1] && (
                    <img
                      src={product.images[1]}
                      alt={product.name}
                      className='image-hover'
                    />
                  )}
                </Link>
                <div className='product-icons'>
                  <FaHeart className='wishlist-icon' />
                  <FaSearch className='quick-view-icon' />
                </div>
              </div>
              <div className='product-details'>
                <h3>{product.name}</h3>
                <p className='old-price'>{FormatCurrency(product.oldPrice)}</p>
                <p className='new-price'>{FormatCurrency(product.price)}</p>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ChildrenClothing
