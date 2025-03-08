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
import { useParams } from 'react-router-dom'

const ProductListScreen = () => {
  const { data, isLoading, error, refetch } = useGetAllproductsQuery({})

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation()
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation()

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id)
        refetch()
        toast.success('Product deleted')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  const createProductHandler = async () => {
    if (window.confirm(`Are you sure you want to create a new product?`)) {
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
        <h1 className='product-list-screen-title'>Product</h1>
        <button
          className='product-list-screen-create-product-btn'
          onClick={createProductHandler}
        >
          <FaEdit /> Create Product
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
              <div className='product-list-screen-product-name'>NAME</div>
              <div className='product-list-screen-product-price'>PRICE</div>
              <div className='product-list-screen-product-category'>
                CATEGORY
              </div>
              <div className='product-list-screen-product-subcategory'>
                SUBCATEGORY
              </div>
              <div className='product-list-screen-product-brand'>BRAND</div>
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
