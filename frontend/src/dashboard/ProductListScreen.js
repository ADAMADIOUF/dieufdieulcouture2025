import React from 'react'
import { Link } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Loader from '../components/Loading'
import Message from '../components/Error'
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetAllproductsQuery,
} from '../slices/productApiSlice'

const ProductListScreen = () => {
  const { data, isLoading, error, refetch } = useGetAllproductsQuery({})

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation()
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation()

  const deleteHandler = async (id) => {
    if (window.confirm('Êtes-vous sûr ?')) {
      try {
        await deleteProduct(id)
        refetch()
        toast.success('Produit supprimé')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  const createProductHandler = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir créer un nouveau produit ?')) {
      try {
        await createProduct()
        refetch()
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  return (
    <>
      <div className='product-list-screen-header-container'>
        <h1 className='product-list-screen-title'>Produits</h1>
        <button
          className='product-list-screen-create-product-btn'
          onClick={createProductHandler}
        >
          <FaEdit /> Créer un produit
        </button>
      </div>

      {(loadingCreate || loadingDelete) && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='product-list-screen-container'>
            <div className='product-list-screen-header'>
              <div className='product-list-screen-product-id'>ID</div>
              <div className='product-list-screen-product-name'>NOM</div>
              <div className='product-list-screen-product-price'>PRIX</div>
              <div className='product-list-screen-product-category'>
                CATÉGORIE
              </div>
              <div className='product-list-screen-product-subcategory'>
                SOUS-CATÉGORIE
              </div>
              <div className='product-list-screen-product-brand'>MARQUE</div>
            </div>
            {data.products.map((product) => (
              <div
                className='product-list-screen-product-item'
                key={product._id}
              >
                <div className='product-list-screen-product-id'>
                  {product._id}
                </div>
                <div className='product-list-screen-product-name'>
                  {product.name}
                </div>
                <div className='product-list-screen-product-price'>
                  {product.price}
                </div>
                <div className='product-list-screen-product-category'>
                  {product.category}
                </div>
                <div className='product-list-screen-product-subcategory'>
                  {product.subcategory}
                </div>
                <div className='product-list-screen-product-brand'>
                  {product.brand}
                </div>
                <div className='product-list-screen-product-actions'>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <button className='edit-product-btn'>
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    className='delete-product-btn'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default ProductListScreen
