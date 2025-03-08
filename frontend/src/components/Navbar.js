import { useState } from 'react'
import { FaBars, FaHeart, FaTimes, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CartButton from './CartButton'
import { clearCartItems } from '../slices/cartSlice'
import { logout } from '../slices/authSlice'
import { useLogoutMutation } from '../slices/userApiSlice'
import SearchProduct from './SearchProduct'
import logo from "../assets/logo.jpg"
const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)
  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      dispatch(clearCartItems())
      navigate('/login') // Fixed missing quotes
    } catch (error) {
      console.log(error)
    }
  }

  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false) // State for admin dropdown

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const toggleAdminDropdown = () => {
    setAdminDropdownOpen(!adminDropdownOpen)
  }

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className='navbar-logo '>
          <Link to='/'>
          <img src={logo} alt="" /></Link>
        </div>

        <div className='navbar-menu-desktop no-wrap'>
          <Link to='/' className='nav-link'>
            Accueil
          </Link>
          <Link to='/about' className='nav-link'>
            À Propos
          </Link>
          <Link to='/shop' className='nav-link'>
            Boutique
          </Link>
          <Link to='/femmes' className='nav-link'>
            Femmes
          </Link>
          <Link to='/hommes' className='nav-link'>
            Hommes
          </Link>
          <Link to='/enfants' className='nav-link'>
            Enfants
          </Link>
          
          <Link to='/contact' className='nav-link'>
            Contact
          </Link>
        </div>

        <CartButton />
        {userInfo ? (
          <div className='register-dropdown'>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className='nav-user'
            >
              {userInfo.name}
            </button>
            {dropdownOpen && (
              <div className='dropdown-user no-wrap'>
                <Link to='/profile' className='dropdown-item'>
                  <FaUser /> Profile
                </Link>
                <Link to='/wishlist' className='dropdown-item'>
                  <FaHeart /> Wishlist
                </Link>
                <button onClick={logoutHandler} className='dropdown-item'>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to='/login' className='nav-button'>
            <FaUser /> Sign In
          </Link>
        )}
      </div>

      <div className={`navbar-menu-mobile ${menuOpen ? 'open' : ''}`}>
        <Link to='/' className='nav-link' onClick={toggleMenu}>
          Accueil
        </Link>
        <Link to='/about' className='nav-link' onClick={toggleMenu}>
          À Propos
        </Link>
        <Link to='/shop' className='nav-link' onClick={toggleMenu}>
          Boutique
        </Link>
        <Link to='/femmes' className='nav-link' onClick={toggleMenu}>
          Femmes
        </Link>
        <Link to='/hommes' className='nav-link' onClick={toggleMenu}>
          Hommes
        </Link>
        <Link to='/enfants' className='nav-link' onClick={toggleMenu}>
          Enfants
        </Link>
       
        <Link to='/contact' className='nav-link' onClick={toggleMenu}>
          Contact
        </Link>
      </div>
      <div className='navbar-icon' onClick={toggleMenu}>
        {menuOpen ? <FaTimes className='icon' /> : <FaBars className='icon' />}
      </div>
      {userInfo && userInfo.isAdmin && (
        <div className='admin-dropdown'>
          <button
            onClick={toggleAdminDropdown}
            className='admin-dropdown-toggle'
          >
            Admin
          </button>
          {adminDropdownOpen && (
            <div className='admin-dropdown-menu no-wrap'>
              <Link
                to='/admin/dashboard'
                className='admin-dropdown-item'
                onClick={() => setAdminDropdownOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to='/admin/productlist'
                className='admin-dropdown-item'
                onClick={() => setAdminDropdownOpen(false)}
              >
                Products
              </Link>
              <Link
                to='/admin/orderlist'
                className='admin-dropdown-item'
                onClick={() => setAdminDropdownOpen(false)}
              >
                Orders
              </Link>
              <Link
                to='/admin/userlist'
                className='admin-dropdown-item'
                onClick={() => setAdminDropdownOpen(false)}
              >
                Users
              </Link>
            </div>
          )}
        </div>
      )}

      <SearchProduct />
    </nav>
  )
}

export default Navbar
