import React from 'react'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { useGetOrdersQuery } from '../slices/orderApiSlice'
import Loader from '../components/Loading'
import Message from '../components/Error'

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery()

  return (
    <>
      <h1>Commandes</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='order-list'>
          {orders.map((order) => (
            <div className='order-card' key={order._id}>
              <div className='order-item'>
                <strong>ID :</strong> {order._id}
              </div>
              <div className='order-item'>
                <strong>Utilisateur :</strong> {order.user && order.user.name}
              </div>
              <div className='order-item'>
                <strong>Date :</strong> {order.createdAt.substring(0, 10)}
              </div>
              <div className='order-item'>
                <strong>Total :</strong> ${order.totalPrice}
              </div>
              <div className='order-item'>
                <strong>Payé :</strong>{' '}
                {order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </div>
              <div className='order-item'>
                <strong>Livré :</strong>{' '}
                {order.isDelivered ? (
                  order.deliveredAt.substring(0, 10)
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </div>
              <div className='order-item'>
                <Link
                  to={`/order/${order._id}`}
                  className='btn btn-light btn-sm'
                >
                  Détails
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default OrderListScreen
