import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { useGetProductsClothingQuery } from '../slices/productApiSlice'
import Error from '../components/Error' // Changed from Message to Error
import Loader from '../components/Loading'
import { FaHeart, FaSearch } from 'react-icons/fa' // Added missing imports
import FormatCurrency from '../components/FormatCurrency'

const WomenClothing = () => {
  const { data, isLoading: loading, error } = useGetProductsClothingQuery()

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Error /> // Updated to use Error instead of Message
  }

  if (!data) {
    return <p>No data available.</p>
  }

  const womenClothingProducts = data.products.filter(
    (product) =>
      product.category === 'clothing' && product.subcategory === 'women'
  )

  return (
    <div className='section-center'>
      <h2 className='section-title'>Collection de Vêtements pour Femmes</h2>
      <p className='section-description'>
        Gardez votre style élégant et sophistiqué avec notre dernière collection de vêtements pour femmes.
      </p>

      <div className='product-grid'>
        {womenClothingProducts.length === 0 ? (
          <p>No women's clothing available.</p>
        ) : (
          womenClothingProducts.map((product) => (
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
               
  <p className='old-price'>{
    FormatCurrency(product.Oldprice)}</p>

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

export default WomenClothing
