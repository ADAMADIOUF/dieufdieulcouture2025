import { FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const CartButton = () => {
  const { cartItems } = useSelector((state) => state.cart) // Get cart items from Redux state

  // Calculate total quantity of items in the cart
  const totalItems = cartItems.reduce((a, c) => a + c.qty, 0)

  // Show the button only if totalItems is greater than 0
  if (totalItems === 0) return null

  return (
    <Link to='/cart' className='cart-button'>
      <FaShoppingCart className='cart-icon' /> <span>Panier</span>
      <span className='cart-badge'>{totalItems}</span>
    </Link>
  )
}

export default CartButton
