import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savesShippingAddress } from '../slices/cartSlice'

const Shipping = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress, paymentMethod } = cart

  const [address, setAddress] = useState(shippingAddress?.address || '')
  const [city, setCity] = useState(shippingAddress?.city || '')
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  )
  const [country, setCountry] = useState(shippingAddress?.country || '')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethod || 'Cash on Delivery'
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      savesShippingAddress({
        address,
        city,
        postalCode,
        country,
        paymentMethod: selectedPaymentMethod,
      })
    )
    navigate('/placeorder')
  }

  return (
    <div className='shipping-container'>
      <h2>Informations de Livraison</h2>
      <form onSubmit={submitHandler} className='space-y-4'>
        <div>
          <label>Adresse</label>
          <input
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className='form-input'
          />
        </div>
        <div>
          <label>Ville</label>
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className='form-input'
          />
        </div>
        <div>
          <label>Code Postal</label>
          <input
            type='text'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            className='form-input'
          />
        </div>
        <div>
          <label>Pays</label>
          <input
            type='text'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className='form-input'
          />
        </div>
        <div>
          <label>Méthode de Paiement</label>
          <select
            value={selectedPaymentMethod}
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            className='form-input'
          >
            <option value='Cash on Delivery'>Paiement à la livraison</option>
            <option value='Stripe'>Stripe</option>
          </select>
        </div>
        <button type='submit' className='submit-button'>
          Continuer
        </button>
      </form>
    </div>
  )
}

export default Shipping
