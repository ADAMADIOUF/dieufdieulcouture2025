import { Link } from 'react-router-dom'
import { FaHeart, FaSearch } from 'react-icons/fa'
import { useGetAllproductsQuery } from '../slices/productApiSlice'
import { useState } from 'react'
import Error from '../components/Error'
import Loading from '../components/Loading'
import Rating from '../components/Rating'
import FormatCurrency from '../components/FormatCurrency'

const ProductCollection = ({ keyword }) => {
  // Receive the keyword as a prop
  const {
    data: productsData,
    error,
    isLoading: loading,
  } = useGetAllproductsQuery({ keyword }) // Pass the keyword to the query

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
      {keyword && (
        <Link to='/' className='btn-back'>
          Go Back
        </Link>
      )}
      <h2>Collection de Vêtements</h2>
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
              <p className='old-price'>{
    FormatCurrency(product.Oldprice)}</p>

<p className='new-price'>{FormatCurrency(product.price)}</p>
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

export default ProductCollection
