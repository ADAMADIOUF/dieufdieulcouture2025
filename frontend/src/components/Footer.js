import React from 'react'
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='footer-container'>
      <div className='footer-about'>
        <h3>À propos du magasin</h3>
        <p>
          Dieuf Dieul Couture, un atelier de couture à Cité Safco Tivaouane
          Peul.
        </p>
        <address>
          <p>Cité Safco, Tivaouane Peul, Sénégal</p>
          <p>+221 77 925 85 08</p>
        </address>

        <div className='social-links'>
          <a
            href='#'
            className='social-icon facebook'
            target='_blank'
            aria-label='Facebook'
          >
            <FaFacebookF />
          </a>
          <a
            href='#'
            className='social-icon instagram'
            target='_blank'
            aria-label='Instagram'
          >
            <FaInstagram />
          </a>
          <a
            href='#'
            className='social-icon tiktok'
            target='_blank'
            aria-label='TikTok'
          >
            <FaTiktok />
          </a>
          <a
            href='#'
            className='social-icon whatsapp'
            target='_blank'
            aria-label='WhatsApp'
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>

      <div className='footer-quick-links'>
        <h4>Liens rapides</h4>
        <ul>
          <li>
            <a href='/about'>À propos de nous</a>
          </li>
          <li>
            <a href='/shop'>Achetez maintenant!</a>
          </li>
          <li>
            <a href='/femmes'>Femmes</a>
          </li>
          <li>
            <a href='/hommes'>Hommes</a>
          </li>
          <li>
            <a href='/enfants'>Enfants</a>
          </li>
          <li>
            <a href='//contact'>Contactez-nous</a>
          </li>
          
          
          
          
          <li>
            <a href='/cart'>Panier</a>
          </li>
          <li>
            <a href='/contact'>Suivi de commande</a>
          </li>
          <li>
            <a href='/contact'>Aide et support</a>
          </li>
        </ul>
      </div>

      <div className='footer-newsletter'>
        <h4>Newsletter</h4>
        <p>
          Pour recevoir les dernières nouvelles et mises à jour de notre part.
        </p>
        <div className='newsletter-form'>
          <input type='email' placeholder='Entrez votre email' />
          <button>S'abonner</button>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>© Dieuf Dieul Couture</p>
      </div>
    </footer>
  )
}

export default Footer
