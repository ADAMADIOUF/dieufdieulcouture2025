import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Error'
import { addToCart, removeFromCart, clearCartItems } from '../slices/cartSlice' // Added clearCart action

const CartPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems, error } = useSelector((state) => state.cart) // Get error from redux store

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id))
  }

  const clearCartHandler = () => {
    dispatch(clearCartItems()) // Clear the cart completely
  }

  return (
    <div className='shopping-cart'>
      {error && <Message>{error}</Message>} {/* Show error message */}
      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty. <Link to={`/shop`}>Go Back</Link>
        </Message>
      ) : (
        <div className='shopping-cart-items'>
          {cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              removeFromCartHandler={removeFromCartHandler}
            />
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <button
          className='clear-cart-button'
          onClick={clearCartHandler} // Button to clear the cart
        >
          Clear Cart
        </button>
      )}
      <CartSummary cartItems={cartItems} checkoutHandler={checkoutHandler} />
    </div>
  )
}

const CartItem = ({ item, removeFromCartHandler }) => {
  const dispatch = useDispatch()
  const [qty, setQty] = useState(item.qty)

  const incrementQuantity = () => {
    if (qty < item.countInStock) {
      setQty(qty + 1)
      dispatch(addToCart({ ...item, qty: qty + 1 }))
    }
  }

  const decrementQuantity = () => {
    if (qty > 1) {
      setQty(qty - 1)
      dispatch(addToCart({ ...item, qty: qty - 1 }))
    }
  }

  return (
    <>
      <div className='product-screen-bg'>
        <span>
          <Link to={`/shop`}>All</Link>
        </span>
        <span>{item.name.substring(0, 20)}</span>
      </div>
      <div className='shopping-cart-item section-center'>
        <article>
          <img
            className='shopping-cart-item-image'
            src={item.images[0]}
            alt={item.name}
          />
        </article>
        <article>
          <Link className='shopping-cart-item-name' to={`/product/${item._id}`}>
            {item.name.substring(0, 50)}
          </Link>
          <div className='shopping-cart-item-price'>${item.price}</div>
          <div className='shopping-cart-item-color'>
            <strong>Color:</strong>
            <span
              style={{
                backgroundColor: item.color, // Use the color directly from the item
                cursor: 'pointer',
                padding: '10px',
                margin: '5px',
                borderRadius: '50%',
              }}
            ></span>
            {item.color}
          </div>
          <div className='shopping-cart-item-size'>
            <strong>Size:</strong> {item.size}
          </div>
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
                    Math.min(item.countInStock, Number(e.target.value))
                  )
                )
              }
              min='1'
              max={item.countInStock}
              className='quantity-input'
            />
            <button className='quantity-button' onClick={incrementQuantity}>
              <FaPlus />
            </button>
          </div>
          <button
            className='shopping-cart-item-remove'
            onClick={() => removeFromCartHandler(item._id)}
          >
            <FaTrash />
          </button>
        </article>
      </div>
    </>
  )
}

const CartSummary = ({ cartItems, checkoutHandler }) => {
  return cartItems.length > 0 ? (
    <div className='shopping-cart-summary'>
      <h2>
        Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
      </h2>
      <div className='shopping-cart-total'>
        $
        {cartItems
          .reduce((acc, item) => acc + item.qty * item.price, 0)
          .toFixed(2)}
      </div>
      <button
        className='checkout-button'
        disabled={cartItems.length === 0}
        onClick={checkoutHandler}
      >
        Proceed To Checkout
      </button>
    </div>
  ) : null
}

export default CartPage
