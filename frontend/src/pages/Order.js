import React, { useEffect } from 'react'
import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
} from '../slices/orderApiSlice'
import { toast } from 'react-toastify'
import { Link, useParams } from 'react-router-dom'
import Message from '../components/Error'
import Loader from '../components/Loading'
import { useSelector } from 'react-redux'
import ContactForm from './ContactForm'

const Order = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' })
  }, [])

  const { id: orderId } = useParams()
  console.log('Order ID:', orderId) // Debugging Log

  const {
    data: order,
    refetch,
    isLoading,
    isError,
    error,
  } = useGetOrderDetailsQuery(orderId)

  console.log('Order Data:', order) // Debugging Log
  console.log('API Error:', isError, error) // Debugging Log

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation()
  const { userInfo } = useSelector((state) => state.auth)

  const deliverHandler = async () => {
    try {
      const response = await deliverOrder(orderId).unwrap()
      console.log('Delivery Success:', response) // Debugging Log
      refetch()
      toast.success('Commande livrée avec succès')
    } catch (error) {
      console.error('Delivery Error:', error) // Debugging Log
      toast.error(
        error?.data?.message || error.message || 'Échec de la livraison'
      )
    }
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return (
      <Message variant='danger'>
        {error?.data?.message ||
          'Échec du chargement des détails de la commande'}
      </Message>
    )
  }

  return (
    <div className='order-screen'>
      <h5 className='order-title'>ID de Commande : {order?._id}</h5>

      <div className='order-details'>
        <div className='shipping-info'>
          <h2 className='info-title'>Expédition</h2>
          <p>
            <strong>Nom:</strong> {order?.user?.name}
          </p>
          <p>
            <strong>Email:</strong> {order?.user?.email}
          </p>
          <p>
            <strong>Adresse:</strong> {order?.shippingAddress?.address},{' '}
            {order?.shippingAddress?.city}, {order?.shippingAddress?.postalCode}
            , {order?.shippingAddress?.country}
          </p>
        </div>

        <div className='payment-info'>
          <h2 className='info-title'>Méthode de Paiement</h2>
          <p>
            <strong>Méthode:</strong> {order?.paymentMethod}
          </p>
        </div>

        <div className='order-items'>
          <h2 className='info-title'>Articles de Commande</h2>
          {order?.orderItems?.length > 0 ? (
            order.orderItems.map((item, index) => (
              <div className='order-item' key={index}>
                <div className='item-image'>
                  <img src={item?.images[0]} alt={item?.name} />
                </div>
                <div className='item-details'>
                  <Link to={`/product/${item?.product}`} className='item-link'>
                    {item?.name?.substring(0, 45)}
                  </Link>
                  <p>
                    {item?.qty} x ${item?.price} = ${item?.qty * item?.price}
                  </p>
                  <div className='order-items'>
                    <h2 className='info-title'>
                      Couleurs et Tailles Sélectionnées
                    </h2>
                    {order?.orderItems?.length > 0 ? (
                      order.orderItems.map((item, index) => (
                        <div key={index} className='color-size-item'>
                          <p>
                            <strong>Produit:</strong> {item?.name}
                          </p>

                          {/* Display Selected Colors */}
                          <div className='shopping-cart-item-color'>
                            <strong>Couleur:</strong>
                            {item?.colors && item.colors.length > 0
                              ? item.colors.map((color, index) => (
                                  <span
                                    key={index}
                                    style={{
                                      backgroundColor: color,
                                      display: 'inline-block',
                                      width: '20px',
                                      height: '20px',
                                      borderRadius: '50%',
                                      border: '1px solid #ccc',
                                      marginLeft: '10px',
                                    }}
                                  ></span>
                                ))
                              : ' Non spécifié'}
                          </div>

                          {/* Display Selected Sizes */}
                          <div className='shopping-cart-item-size'>
                            <strong>Taille:</strong>{' '}
                            {item?.sizes && item.sizes.length > 0
                              ? item.sizes.join(', ')
                              : 'Non spécifiée'}
                          </div>
                        </div>
                      ))
                    ) : (
                      <Message>
                        Aucune couleur ou taille sélectionnée pour cette
                        commande
                      </Message>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Message>Aucun article dans cette commande</Message>
          )}
        </div>
      </div>

      <div className='order-summary'>
        <h2 className='info-title'>Résumé de la Commande</h2>
        <div className='summary-row'>
          <span>Articles:</span> <span>${order?.itemsPrice}</span>
        </div>
        <div className='summary-row'>
          <span>Expédition:</span> <span>${order?.shippingPrice}</span>
        </div>
        <div className='summary-row'>
          <span>Taxe:</span> <span>${order?.taxPrice}</span>
        </div>
        <div className='summary-row'>
          <span>Total:</span> <span>${order?.totalPrice}</span>
        </div>

        {/* Cash on Delivery - Show Contact Form */}
        {order?.paymentMethod === 'Cash on Delivery' && !order?.isPaid && (
          <div className='payment-section'>
            <ContactForm />
          </div>
        )}

        {/* Admin can mark order as delivered */}
        {userInfo?.isAdmin && order?.isPaid && !order?.isDelivered && (
          <>
            {loadingDeliver && <Loader />}
            <button className='btn-deliver' onClick={deliverHandler}>
              Marquer comme Livré
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Order
