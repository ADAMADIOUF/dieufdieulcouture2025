import React from 'react'
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa'
import { useGetUsersQuery, useDeleteUserMutation } from '../slices/userApiSlice'
import Loader from '../components/Loading'
import Message from '../components/Error'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const UserList = () => {
  const navigate = useNavigate()
  const { data: users, isLoading, error, refetch } = useGetUsersQuery()
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation()

  const deleteHandler = async (id) => {
    if (window.confirm('Êtes-vous sûr ?')) {
      try {
        await deleteUser(id)
        refetch()
        toast.success('Utilisateur supprimé')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  return (
    <div className='container'>
      <h1>Utilisateurs</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='user-list'>
          {users.map((user) => (
            <div className='user-card' key={user._id}>
              <div className='user-info'>
                <div>ID : {user._id}</div>
                <div>Nom : {user.name}</div>
                <div>
                  Email : <a href={`mailto:${user.email}`}>{user.email}</a>
                </div>
                <div>
                  Admin :{' '}
                  {user.isAdmin ? (
                    <FaCheck className='fa-check' />
                  ) : (
                    <FaTimes className='fa-times' />
                  )}
                </div>
              </div>
              <div>
                <button
                  className='btn btn-light'
                  onClick={() => navigate(`/admin/user/${user._id}/edit`)}
                >
                  <FaEdit />
                </button>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteHandler(user._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserList
