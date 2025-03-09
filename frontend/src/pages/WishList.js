import React, { useEffect } from 'react'
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from '../slices/wishApiSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loading'
import Message from '../components/Error'

const WishList = () => {
  const navigate = useNavigate()
  const { data: wishlist, error, isLoading } = useGetWishlistQuery()
  const [removeFromWishlist, { isLoading: loadingRemove }] =
    useRemoveFromWishlistMutation()

  console.log(wishlist, 'Wishlist Data')

  const handleRemoveFromWishlist = async (productId) => {
    await removeFromWishlist(productId)
  }

  useEffect(() => {
    if (error) {
      console.error('Error fetching wishlist:', error)
    }
  }, [error])

  return (
    <div className='wishlist-screen'>
      <h1>Your Wishlist</h1>
      {isLoading || loadingRemove ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.message}</Message>
      ) : wishlist && wishlist.products && wishlist.products.length > 0 ? (
        <div className='wishlist-items'>
          {wishlist.products.map((item) => (
            <div key={item._id} className='wishlist-item'>
              <img src={item.images[0]} alt={item.name} />
              <div className='wishlist-item-details'>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <button
                  onClick={() => handleRemoveFromWishlist(item._id)}
                  className='btn btn-danger'
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Message>Your wishlist is empty</Message>
      )}
    </div>
  )
}

export default WishList
