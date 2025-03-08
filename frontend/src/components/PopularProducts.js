import { Link } from 'react-router-dom'
import { FaHeart, FaSearch } from 'react-icons/fa'
import { useGetAllproductsQuery } from '../slices/productApiSlice'
import { useState } from 'react'
import Error from './Error'
import Loading from './Loading'
import Rating from './Rating'

const PopularProducts = () => {
  const [keyword] = useState('') // You can update the keyword if needed
  const {
    data: productsData,
    error,
    isLoading: loading,
  } = useGetAllproductsQuery({ keyword, sortBy: 'popular' }) // Pass sortBy for popular products

  console.log(productsData)

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <Error variant='danger'>{error?.data?.message || 'Error occurred'}</Error>
    )
  }

  return (
    <div className='product-collection section-center'>
      <h2>Popular Products</h2>
      <div className='product-grid'>
        {productsData?.products?.map((product) => (
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
              {product.Oldprice && (
                <p className='old-price'>${product.Oldprice}</p>
              )}
              <p className='new-price'>${product.price}</p>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopularProducts
