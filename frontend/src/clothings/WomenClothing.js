import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { useGetProductsClothingQuery } from '../slices/productApiSlice'
import Message from '../components/Error'
import Loader from '../components/Loading'

const WomenClothing = () => {
  

  const { data, isLoading: loading, error } = useGetProductsClothingQuery()

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Message />
  }

  if (!data) {
    return <p>No data available.</p>
  }

 
  const womenClothingProducts = data.products.filter(
    (product) =>
      product.category === 'clothing' && product.subcategory === 'women'
  )

  return (
    <>
      <h2 className='section-title'>Women's Clothing Collection</h2>
      <p className='section-description'>
        Keep your style sharp and sophisticated with our latest collection of
        women's clothing.
      </p>

      <div className='clothing-container'>
        {womenClothingProducts.length === 0 ? (
          <p>No women's clothing available.</p>
        ) : (
          womenClothingProducts.map((product) => (
            <div key={product._id} className='product-clothing-card'>
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className='product-image-clothing'
                />
              </Link>
              <div className='product-details-clothing'>
                <Link to={`/product/${product._id}`}>
                  <h3 className='product-title-clothing'>
                    {product.name.substring(0, 20)}
                  </h3>
                </Link>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                <p className='product-price-clothing'>${product.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default WomenClothing
