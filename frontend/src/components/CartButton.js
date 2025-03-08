import { FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const CartButton = () => {
  const { cartItems } = useSelector((state) => state.cart)  // Get cart items from Redux state

  // Calculate total quantity of items in the cart
  const totalItems = cartItems.reduce((a, c) => a + c.qty, 0)

  return (
    <Link to="/cart" className="cart-button">
      <FaShoppingCart /> Cart
      {totalItems > 0 && (
        <span className="cart-badge">{totalItems}</span>  
      )}
    </Link>
  )
}

export default CartButton
