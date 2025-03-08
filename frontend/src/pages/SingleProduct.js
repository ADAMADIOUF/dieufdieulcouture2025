import React, { useState } from 'react'
import { useGetproductDetailQuery } from '../slices/productApiSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Error from '../components/Error'
import Loading from '../components/Loading'
import Rating from '../components/Rating'
import TabSingleProduct from '../components/TabSingleProduct'
import { useDispatch } from 'react-redux'
import { addToCart } from '../slices/cartSlice'
import { FaMinus, FaPlus } from 'react-icons/fa'
import FormatCurrency from '../components/FormatCurrency'

const SingleProduct = () => {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [mainImage, setMainImage] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [activeTab, setActiveTab] = useState('description') // Active tab state
  const { id: productId } = useParams()

  const {
    data: product,
    isLoading: loading,
    error,
  } = useGetproductDetailQuery(productId)

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
  } = product || {}

  const handleColorSelect = (color) => setSelectedColor(color)
  const handleSizeSelect = (size) => setSelectedSize(size)

  const handleTabClick = (tab) => setActiveTab(tab) // Handle tab changes

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
            <p className='old-price'>{
    FormatCurrency(product.Oldprice)}</p>

<p className='new-price'>{FormatCurrency(product.price)}</p>
            
          </div>
          <Rating value={product.rating} text={`${product.numReviews} Avis`} />
          <p className='description'>
            {description || 'No description available'}
          </p>

          <div className='stock-info'>
            <p>{countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
          </div>

          <div className='sizes'>
            <label>Sizes:</label>
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
            <label>Colors:</label>
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
          {product.countInStock > 0 && (
            <div className='quantity-controls'>
              <h3>Quantity</h3>
              <button className='quantity-button' onClick={decrementQuantity}>
                <FaMinus />
              </button>
              <input
                type='number'
                value={qty}
                onChange={(e) =>
                  setQty(
                    Math.max(
                      1,
                      Math.min(product.countInStock, Number(e.target.value))
                    )
                  )
                }
                min='1'
                max={product.countInStock}
                className='quantity-input'
              />
              <button className='quantity-button' onClick={incrementQuantity}>
                <FaPlus />
              </button>
            </div>
          )}
          <button
            type='button'
            disabled={
              product.countInStock === 0 || !selectedColor || !selectedSize
            }
            onClick={addToCartHandler}
            className={`add-to-cart-btn ${
              product.countInStock === 0 || !selectedColor || !selectedSize
                ? 'disabled'
                : ''
            }`}
          >
            Add to Cart
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
          Product Info
        </button>
        <button
          onClick={() => handleTabClick('reviews')}
          className={activeTab === 'reviews' ? 'active' : ''}
        >
          Reviews
        </button>
      </div>

      <TabSingleProduct
        name={name}
        price={price}
        description={description}
        activeTab={activeTab}
        reviews={product.reviews}
      />
    </>
  )
}

export default SingleProduct
