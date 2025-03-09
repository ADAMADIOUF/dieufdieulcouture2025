import React, { useState, useEffect } from 'react'
import { useSendContactFormMutation } from '../slices/contactApiSlice'
import { useLocation, useParams } from 'react-router-dom'
import { useGetOrderDetailsQuery } from '../slices/orderApiSlice'

const FormulaireContact = () => {
  const location = useLocation()
  const { id: orderId } = useParams()
  const { data: order } = useGetOrderDetailsQuery(orderId)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    description: '',
    address: '',
    totalPrice: order ? order.totalPrice : '',
    productName:
      order && order.orderItems.length > 0
        ? order.orderItems.map((item) => item.name).join(', ')
        : '',
  })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [sendContactForm, { isLoading, isError }] = useSendContactFormMutation()

  useEffect(() => {
    window.scrollTo(0, 0)
    setFormData((prevFormData) => ({
      ...prevFormData,
      totalPrice: order ? order.totalPrice : '',
    }))
  }, [location, order])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let emailContent = `
        Prénom: ${formData.firstName}
        Nom: ${formData.lastName}
        Numéro de téléphone: ${formData.phone}
        Adresse: ${formData.address}
        Description: ${formData.description}`

      if (formData.totalPrice) {
        emailContent += `\nPrix total: $${formData.totalPrice}`
      }

      setIsFormSubmitted(true)

      await sendContactForm({
        ...formData,
        message: emailContent,
      })

      setFormData({
        firstName: '',
        lastName: '',
        subject: '',
        phone: '',
        description: '',
        address: '',
        totalPrice: '',
        productName: '',
      })
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de l'envoi du formulaire:",
        error
      )
    }
  }

  return (
    <div className='contact-container'>
      {!isFormSubmitted && (
        <form onSubmit={handleSubmit} className='contact-form'>
          <h2>Détails de facturation</h2>
          <div className='form-group'>
            <label htmlFor='firstName'>Prénom:</label>
            <input
              type='text'
              id='firstName'
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='lastName'>Nom:</label>
            <input
              type='text'
              id='lastName'
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='phoneNumber'>Numéro de téléphone:</label>
            <input
              type='tel'
              id='phoneNumber'
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='address'>Adresse:</label>
            <textarea
              id='address'
              rows='3'
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description:</label>
            <textarea
              id='description'
              rows='3'
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className='form-group'>
            <label htmlFor='totalPrice'>Prix Total CFA:</label>
            <input
              type='text'
              id='totalPrice'
              value={formData.totalPrice}
              onChange={(e) =>
                setFormData({ ...formData, totalPrice: e.target.value })
              }
            />
          </div>
          <div className='form-group'>
            <label htmlFor='productName'>Nom du produit:</label>
            <input
              type='text'
              id='productName'
              value={formData.productName}
              onChange={(e) =>
                setFormData({ ...formData, productName: e.target.value })
              }
            />
          </div>
          <button type='submit' className='btn-submit' disabled={isLoading}>
            {isLoading ? 'Envoi en cours...' : 'Envoyer le message'}
          </button>
          {isError && (
            <div className='error-message'>
              Une erreur s'est produite lors de l'envoi du formulaire. Veuillez
              réessayer.
            </div>
          )}
        </form>
      )}
      {isFormSubmitted && !isError && (
        <div className='success-message'>
          Message envoyé avec succès! Nous vous répondrons bientôt.
        </div>
      )}
    </div>
  )
}

export default FormulaireContact
