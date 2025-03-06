import React from 'react'
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='footer-container'>
      <div className='footer-about'>
        <h3>À propos du magasin</h3>
        <p>Un des plus populaires sur le web pour faire des achats.</p>
        <address>
          <p>Wonder Street, USA, New York</p>
          <p>+01 321 654 214</p>
          <p>hello@xton.com</p>
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
            <a href='/about-us'>À propos de nous</a>
          </li>
          <li>
            <a href='/shop-now'>Achetez maintenant!</a>
          </li>
          <li>
            <a href='/womens'>Femme</a>
          </li>
          <li>
            <a href='/faqs'>FAQ</a>
          </li>
          <li>
            <a href='/contact-us'>Contactez-nous</a>
          </li>
          <li>
            <a href='/customer-services'>Services clients</a>
          </li>
          <li>
            <a href='/customer-support'>Support client</a>
          </li>
          <li>
            <a href='/my-account'>Mon compte</a>
          </li>
          <li>
            <a href='/checkout'>Caisse</a>
          </li>
          <li>
            <a href='/cart'>Panier</a>
          </li>
          <li>
            <a href='/order-tracking'>Suivi de commande</a>
          </li>
          <li>
            <a href='/help-support'>Aide et support</a>
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
        <p>© Xton est fièrement détenu par HiBootstrap</p>
      </div>
    </footer>
  )
}

export default Footer
