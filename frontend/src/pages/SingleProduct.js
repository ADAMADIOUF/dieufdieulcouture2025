import React, { useState } from 'react'
import {
  useGetproductDetailQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
} from '../slices/productApiSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Error from '../components/Error'
import Loading from '../components/Loading'
import Rating from '../components/Rating'
import TabSingleProduct from '../components/TabSingleProduct'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../slices/cartSlice'
import { FaHeart, FaMinus, FaPlus, FaTrash } from 'react-icons/fa'
import FormatCurrency from '../components/FormatCurrency'
import { toast } from 'react-toastify'
import { useAddToWishlistMutation } from '../slices/wishApiSlice'
import  Message  from '../components/Error'

const SingleProduct = () => {
  const [qty, setQty] = useState(1)
  const [mainImage, setMainImage] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [activeTab, setActiveTab] = useState('description') // Active tab state
  const { id: productId } = useParams()
  const { userInfo } = useSelector((state) => state.auth)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Get product details from the API
  const {
    data: product,
    refetch,
    isLoading: loading,
    error,
  } = useGetproductDetailQuery(productId)

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation()
  const [deleteReview, { isLoading: loadingDeletedReview }] =
    useDeleteReviewMutation()
  const [addToWishlist, { isLoading: loadingAddToWishlist }] =
    useAddToWishlistMutation()

  const incrementQuantity = () => {
    if (qty < product.countInStock) {
      setQty(qty + 1)
    }
  }

  const decrementQuantity = () => {
    if (qty > 1) {
      setQty(qty - 1)
    }
  }

  const addToCartHandler = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select a color and size before adding to cart.')
      return
    }
    dispatch(
      addToCart({ ...product, qty, color: selectedColor, size: selectedSize })
    )
    navigate('/cart')
  }

  const addToWishlistHandler = async () => {
    try {
      await addToWishlist(productId).unwrap() // Call the mutation to add to wishlist
      toast.success('Product added to wishlist!')
    } catch (error) {
      toast.error('Failed to add to wishlist. Please login.')
    }
  }

  const handleColorSelect = (color) => setSelectedColor(color)
  const handleSizeSelect = (size) => setSelectedSize(size)

  const handleTabClick = (tab) => setActiveTab(tab) // Handle tab changes

  const deleteReviewHandler = async (reviewId) => {
    try {
      await deleteReview({ productId, reviewId }).unwrap()
      refetch()
      toast.success('Review Deleted')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
const submitHandler = async (e) => {
  e.preventDefault()
  try {
    await createReview({
      productId,
      rating,
      comment,
    }).unwrap()
    refetch()
    toast.success('Review Submited')
    setRating(0)
    setComment('')
  } catch (error) {
    toast.error(error?.data?.message || error.error)
  }
}


  if (loading) return <Loading />
  if (error) return <Error variant='danger'>{error}</Error>

  const {
    name,
    brand,
    category,
    price,
    Oldprice,
    description,
    images,
    colors,
    sizes,
    countInStock,
    reviews,
  } = product || {}

  return (
    <>
      <div className='single-product-container'>
        <div className='single-product-images'>
          <img
            src={mainImage || images[0]}
            alt={name}
            className='single-main-product-image'
          />
          <div className='thumbnail-images'>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${name}-thumbnail-${index}`}
                onClick={() => setMainImage(image)}
                className='thumbnail'
              />
            ))}
          </div>
        </div>

        <div className='single-product-details'>
          <h2>{name}</h2>
          <h3>{brand}</h3>
          <p className='category'>{category}</p>

          <div className='price'>
            <p className='old-price'>{FormatCurrency(Oldprice)}</p>
            <p className='new-price'>{FormatCurrency(price)}</p>
          </div>
          <Rating value={product.rating} text={`${product.numReviews} Avis`} />
          <p className='description'>
            {description || 'No description available'}
          </p>

          <div className='stock-info'>
            <p>{countInStock > 0 ? 'En Stock' : 'Rupture de Stock'}</p>
          </div>

          <div className='sizes'>
            <label>Tailles:</label>
            <ul>
              {sizes.map((size, index) => (
                <li
                  key={index}
                  onClick={() => handleSizeSelect(size)}
                  className={selectedSize === size ? 'selected' : ''}
                >
                  {size}
                </li>
              ))}
            </ul>
          </div>

          <div className='colors'>
            <label>Couleurs:</label>
            <ul>
              {colors.map((color, index) => (
                <li
                  key={index}
                  onClick={() => handleColorSelect(color)}
                  className={selectedColor === color ? 'selected' : ''}
                  style={{
                    backgroundColor: color,
                    cursor: 'pointer',
                    padding: '10px',
                    margin: '5px',
                    borderRadius: '50%',
                  }}
                >
                  {selectedColor === color && <span>✓</span>}
                </li>
              ))}
            </ul>
          </div>

          {countInStock > 0 && (
            <div className='quantity-controls'>
              <h3>Quantité</h3>
              <button className='quantity-button' onClick={decrementQuantity}>
                <FaMinus />
              </button>
              <input
                type='number'
                value={qty}
                onChange={(e) =>
                  setQty(
                    Math.max(1, Math.min(countInStock, Number(e.target.value)))
                  )
                }
                min='1'
                max={countInStock}
                className='quantity-input'
              />
              <button className='quantity-button' onClick={incrementQuantity}>
                <FaPlus />
              </button>
            </div>
          )}

          <button
            type='button'
            disabled={countInStock === 0 || !selectedColor || !selectedSize}
            onClick={addToCartHandler}
            className={`add-to-cart-btn ${
              countInStock === 0 || !selectedColor || !selectedSize
                ? 'disabled'
                : ''
            }`}
          >
            Ajouter au Panier
          </button>

          <button
            className='btn-wishlist'
            onClick={addToWishlistHandler}
            disabled={loadingAddToWishlist}
          >
            <FaHeart /> Add to Wishlist
          </button>
        </div>

       </div>

      <div className='tabs'>
        <button
          onClick={() => handleTabClick('description')}
          className={activeTab === 'description' ? 'active' : ''}
        >
          Description
        </button>
        <button
          onClick={() => handleTabClick('info')}
          className={activeTab === 'info' ? 'active' : ''}
        >
          Informations sur le produit
        </button>
        <button
          onClick={() => handleTabClick('reviews')}
          className={activeTab === 'reviews' ? 'active' : ''}
        >
          Avis
        </button>
      </div>

      <TabSingleProduct
        name={name}
        price={price}
        description={description}
        activeTab={activeTab}
        reviews={reviews}
      />
    </>
  )
}

export default SingleProduct
