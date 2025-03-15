import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../components/Loading'
import Message from '../components/Error'
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../slices/userApiSlice'

const UserEdit = () => {
  const { id: userId } = useParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const { data: user, isLoading, error } = useGetUserDetailsQuery(userId)
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [user])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await updateUser({ userId, name, email, isAdmin })
      toast.success('User updated successfully')
      navigate('/admin/userlist')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <div className='container'>
      <Link to={`/admin/userlist`} className='btn-back'>
        Go Back
      </Link>
      <h1>Edit User</h1>
      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error && error.response && error.response.data ? (
        <Message variant='danger'>{error.response.data.message}</Message>
      ) : (
        <form onSubmit={submitHandler} className='form'>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label>
              <input
                type='checkbox'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              Is Admin
            </label>
          </div>
          <button type='submit' className='btn-update'>
            Update
          </button>
        </form>
      )}
    </div>
  )
}

export default UserEdit
