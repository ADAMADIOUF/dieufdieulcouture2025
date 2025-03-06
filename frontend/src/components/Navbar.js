import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className='navbar-logo'>
          <Link to='/'>Dieuf Dieul Couture</Link>
        </div>

        <div className='navbar-menu-desktop'>
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
          <Link to='/services' className='nav-link'>
            Services
          </Link>
          <Link to='/contact' className='nav-link'>
            Contact
          </Link>
        </div>

        <div className='navbar-icon' onClick={toggleMenu}>
          {menuOpen ? (
            <FaTimes className='icon' />
          ) : (
            <FaBars className='icon' />
          )}
        </div>
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
        <Link to='/services' className='nav-link' onClick={toggleMenu}>
          Services
        </Link>
        <Link to='/contact' className='nav-link' onClick={toggleMenu}>
          Contact
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
