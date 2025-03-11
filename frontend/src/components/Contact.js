import React, { useState, useEffect } from 'react'
import { useSendContactFormMutation } from '../slices/contactApiSlice'
import { useLocation } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { FaPhoneAlt, FaEnvelope, FaBuilding } from 'react-icons/fa'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet' // Import Leaflet pour la gestion des icônes personnalisées

const Contact = () => {
  const location = useLocation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    message: '',
  })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [sendContactForm, { isLoading, isError }] = useSendContactFormMutation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let emailContent = `
        Nom: ${formData.name}
        Email: ${formData.email}
        Numéro de téléphone: ${formData.phoneNumber}
        Nom de l'entreprise: ${formData.companyName}
        Message: ${formData.message}`

      setIsFormSubmitted(true)

      await sendContactForm({
        ...formData,
        message: emailContent,
      })

      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        companyName: '',
        message: '',
      })
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de l'envoi du formulaire:",
        error
      )
    }
  }

  // Créer une icône personnalisée pour le marqueur
  const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
  })

  return (
    <>
      {!isFormSubmitted && (
        <form onSubmit={handleSubmit} className='contact-form'>
          <h2>Contactez-nous</h2>
          <div className='form-group'>
            <label htmlFor='name'>Nom :</label>
            <input
              type='text'
              id='name'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>
              <FaEnvelope /> Email :
            </label>
            <input
              type='email'
              id='email'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='phoneNumber'>
              <FaPhoneAlt /> Numéro de téléphone :
            </label>
            <input
              type='tel'
              id='phoneNumber'
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='companyName'>
              <FaBuilding /> Nom de l'entreprise :
            </label>
            <input
              type='text'
              id='companyName'
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
            />
          </div>
          <div className='form-group'>
            <label htmlFor='message'>Message :</label>
            <textarea
              id='message'
              rows='3'
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
            />
          </div>
          <button type='submit' className='btn-submit' disabled={isLoading}>
            {isLoading ? 'Envoi en cours...' : 'Envoyer le message'}
          </button>
          {isError && (
            <p className='error-message'>
              Une erreur est survenue lors de l\'envoi du formulaire. Veuillez
              réessayer.
            </p>
          )}
        </form>
      )}
      {isFormSubmitted && !isError && (
        <p className='success-message'>
          Message envoyé avec succès ! Nous vous répondrons bientôt.
        </p>
      )}

      <div className='map-container' style={{ marginTop: '50px' }}>
        <h3>Trouvez-nous ici</h3>
        <MapContainer
          center={[14.78642767086612, -17.31171393493538]} // Remplacez par les bonnes coordonnées
          zoom={13}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributeurs'
          />
          <Marker
            position={[14.78642767086612, -17.31171393493538]}
            icon={customIcon}
          >
            {' '}
            {/* Remplacez par les bonnes coordonnées */}
            <Popup>
              <strong>Dieuf Dieul Couture</strong>
              <br />
              Adresse : Cite Safco 3 Tivaoune Peulh, Sénégal
              <br />
              Téléphone : +221 77 925 85 08
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  )
}

export default Contact
