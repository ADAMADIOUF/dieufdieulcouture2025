import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  useGetproductDetailQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../slices/productApiSlice'

import Loader from '../components/Loading'
import Message from '../components/Error'

const ProductEditScreen = () => {
  const { id: productId } = useParams()
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [Oldprice, setOldPrice] = useState(0)
  const [images, setImages] = useState([])
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
   const [colors, setColors] = useState([])
   const [sizes, setSizes] = useState([])
  const {
    data: product,
    isLoading,
    error,
  } = useGetproductDetailQuery(productId)
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation()
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (product) {
      setName(product.name)
      setPrice(product.price)
      setOldPrice(product.Oldprice)
      setImages(product.images)
      setBrand(product.brand)
      setCategory(product.category)
      setSubCategory(product.subcategory)
      setCountInStock(product.countInStock)
      setDescription(product.description)
      setColors(product.colors || [])
      setSizes(product.sizes || [])
    }
  }, [product])

  const submitHandler = async (e) => {
    e.preventDefault()
    const updatedProduct = {
      productId,
      name,
      price,
     Oldprice,
      images,
      brand,
      category,
      subcategory,
      countInStock,
      description,
      colors,
      sizes,
    }
    const result = await updateProduct(updatedProduct)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Product updated')
      navigate('/admin/productlist')
    }
  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    for (let i = 0; i < Math.min(e.target.files.length, 5); i++) {
      formData.append('images', e.target.files[i])
    }

    try {
      const res = await uploadProductImage(formData).unwrap()
      const uploadedImages = res.images
      setImages((prevImages) => [...prevImages, ...uploadedImages])
      toast.success(res.message)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const deleteImageHandler = (index) => {
    const updatedImages = images.filter((_, i) => i !== index)
    setImages(updatedImages)
  }

  return (
    <div className='edit-product-container'>
      <Link to={`/admin/productlist`} className='btn-back'>
        Go Back
      </Link>
      <div className='edit-product-title'>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <form onSubmit={submitHandler} className='edit-product-form'>
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
              <label htmlFor='price'>Price</label>
              <input
                type='number'
                id='price'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='price'>Old Price</label>
              <input
                type='number'
                id='price'
                placeholder='Enter price'
                value={Oldprice}
                onChange={(e) => setOldPrice(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='images'>Images</label>
              <input
                type='file'
                id='images'
                multiple
                onChange={uploadFileHandler}
              />
              {images && images.length > 0 && (
                <div className='image-preview'>
                  {images.map((image, index) => (
                    <div key={index} className='image-item'>
                      <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className='img-thumbnail'
                      />
                      <button
                        type='button'
                        className='btn-delete'
                        onClick={() => deleteImageHandler(index)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className='form-group'>
              <label htmlFor='brand'>Brand</label>
              <input
                type='text'
                id='brand'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='countInStock'>Count In Stock</label>
              <input
                type='number'
                id='countInStock'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='category'>Category</label>
              <input
                type='text'
                id='category'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='subCategory'>Subcategory</label>
              <input
                type='text'
                id='subCategory'
                placeholder='Enter subcategory'
                value={subcategory}
                onChange={(e) => setSubCategory(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <input
                type='text'
                id='description'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='colors'>Colors</label>
              <input
                type='text'
                id='colors'
                placeholder='Enter colors (comma-separated)'
                value={colors.join(', ')}
                onChange={(e) =>
                  setColors(e.target.value.split(',').map((c) => c.trim()))
                }
              />
            </div>
            <div className='form-group'>
              <label htmlFor='sizes'>Sizes</label>
              <input
                type='text'
                id='sizes'
                placeholder='Enter sizes (comma-separated)'
                value={sizes.join(', ')}
                onChange={(e) =>
                  setSizes(e.target.value.split(',').map((s) => s.trim()))
                }
              />
            </div>
            <button type='submit' className='btn-update'>
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ProductEditScreen
