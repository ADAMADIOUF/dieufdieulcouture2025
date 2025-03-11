import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../components/Error'
import Loader from '../components/Loading'
import { toast } from 'react-toastify'
import { useCreateOrderMutation } from '../slices/orderApiSlice'
import { clearCartItems } from '../slices/cartSlice'

const PlaceOrderScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const [createOrder, { isLoading, error }] = useCreateOrderMutation()

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping')
    } else if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate])

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice || 0,
        shippingPrice: cart.shippingPrice || 0,
        taxPrice: cart.taxPrice || 0,
        totalPrice: cart.totalPrice || 0,
      }).unwrap()
      dispatch(clearCartItems())
      navigate(`/order/${res._id}`)
    } catch (error) {
      toast.error(
        error?.data?.message || error.message || JSON.stringify(error)
      )
    }
  }

  return (
    <div className='place-order-container'>
      <div className='place-order'>
        <div className='place-order-content'>
          <div className='placeorder-details'>
            <h2 className='placeorder-title'>Livraison</h2>
            <p>
              <strong>Adresse:</strong> {cart.shippingAddress.address},{' '}
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{' '}
              {cart.shippingAddress.country}
            </p>
          </div>

          <div className='placeorder-payment'>
            <h2 className='placeorder-payment-text'>Méthode de Paiement</h2>
            <p>
              <strong>Méthode:</strong> {cart.paymentMethod}
            </p>
          </div>

          <div className='border p-4 rounded shadow mt-4'>
            <h2 className='placeorder-commad'>Articles de Commande</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Votre panier est vide</Message>
            ) : (
              <ul>
                {cart.cartItems.map((item, index) => (
                  <li
                    key={index}
                    className='place-order-item'
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className='place-order-img'
                    />
                    <Link
                      to={`/product/${item._id}`}
                      className='place-order-name'
                    >
                      {item.name.substring(0, 45)}
                    </Link>
                    <p>
                      {item.qty} x ${item.price} = {item.qty * item.price} CFA
                    </p>
                    <div className='shopping-cart-item-color'>
                      <strong>Couleur:</strong>
                      <span
                        style={{
                          backgroundColor: item.color,
                          padding: '10px',
                          margin: '5px',
                          borderRadius: '50%',
                        }}
                      ></span>{' '}
                      {item.color}
                    </div>
                    <div className='shopping-cart-item-size'>
                      <strong>Taille:</strong> {item.size}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className='border p-4 rounded shadow h-max'>
          <h2 className='place-order-summary-order'>Résumé de la Commande</h2>
          <p>
            <strong>Total:</strong> ${cart.totalPrice}
          </p>
          {error && (
            <Message variant='danger'>
              {error?.data?.message || error.message}
            </Message>
          )}
          {cart.paymentMethod === 'Cash on Delivery' ? (
            <button onClick={placeOrderHandler} className='btn-placeorder'>
              Confirmer le Paiement en Espèces
            </button>
          ) : (
            <button
              onClick={() => navigate('/stripe-payment')}
              className='btn-placeorder'
            >
              Payer avec Stripe
            </button>
          )}
          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  )
}

export default PlaceOrderScreen
