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
  const [nom, setNom] = useState('')
  const [prix, setPrix] = useState(0)
  const [ancienPrix, setAncienPrix] = useState(0)
  const [images, setImages] = useState([])
  const [marque, setMarque] = useState('')
  const [categorie, setCategorie] = useState('')
  const [sousCategorie, setSousCategorie] = useState('')
  const [stock, setStock] = useState(0)
  const [description, setDescription] = useState('')
  const [couleurs, setCouleurs] = useState([])
  const [tailles, setTailles] = useState([])

  const {
    data: produit,
    isLoading,
    error,
  } = useGetproductDetailQuery(productId)
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation()
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (produit) {
      setNom(produit.name)
      setPrix(produit.price)
      setAncienPrix(produit.Oldprice)
      setImages(produit.images)
      setMarque(produit.brand)
      setCategorie(produit.category)
      setSousCategorie(produit.subcategory)
      setStock(produit.countInStock)
      setDescription(produit.description)
      setCouleurs(produit.colors || [])
      setTailles(produit.sizes || [])
    }
  }, [produit])

  const submitHandler = async (e) => {
    e.preventDefault()
    const produitMisAJour = {
      productId,
      nom,
      prix,
      ancienPrix,
      images,
      marque,
      categorie,
      sousCategorie,
      stock,
      description,
      couleurs,
      tailles,
    }
    const result = await updateProduct(produitMisAJour)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Produit mis à jour')
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
    const imagesMisesAJour = images.filter((_, i) => i !== index)
    setImages(imagesMisesAJour)
  }

  return (
    <div className='edit-product-container'>
      <Link to={`/admin/productlist`} className='btn-back'>
        Retour
      </Link>
      <div className='edit-product-title'>
        <h1>Modifier le produit</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <form onSubmit={submitHandler} className='edit-product-form'>
            <div className='form-group'>
              <label htmlFor='nom'>Nom</label>
              <input
                type='text'
                id='nom'
                placeholder='Entrez le nom'
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='prix'>Prix</label>
              <input
                type='number'
                id='prix'
                placeholder='Entrez le prix'
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='ancienPrix'>Ancien Prix</label>
              <input
                type='number'
                id='ancienPrix'
                placeholder='Entrez l’ancien prix'
                value={ancienPrix}
                onChange={(e) => setAncienPrix(e.target.value)}
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
                        Supprimer
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className='form-group'>
              <label htmlFor='marque'>Marque</label>
              <input
                type='text'
                id='marque'
                placeholder='Entrez la marque'
                value={marque}
                onChange={(e) => setMarque(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='stock'>Stock</label>
              <input
                type='number'
                id='stock'
                placeholder='Entrez la quantité en stock'
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='categorie'>Catégorie</label>
              <input
                type='text'
                id='categorie'
                placeholder='Entrez la catégorie'
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='sousCategorie'>Sous-catégorie</label>
              <input
                type='text'
                id='sousCategorie'
                placeholder='Entrez la sous-catégorie'
                value={sousCategorie}
                onChange={(e) => setSousCategorie(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <input
                type='text'
                id='description'
                placeholder='Entrez la description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='couleurs'>Couleurs</label>
              <input
                type='text'
                id='couleurs'
                placeholder='Entrez les couleurs (séparées par des virgules)'
                value={couleurs.join(', ')}
                onChange={(e) =>
                  setCouleurs(e.target.value.split(',').map((c) => c.trim()))
                }
              />
            </div>
            <div className='form-group'>
              <label htmlFor='tailles'>Tailles</label>
              <input
                type='text'
                id='tailles'
                placeholder='Entrez les tailles (séparées par des virgules)'
                value={tailles.join(', ')}
                onChange={(e) =>
                  setTailles(e.target.value.split(',').map((t) => t.trim()))
                }
              />
            </div>
            <button type='submit' className='btn-update'>
              Mettre à jour
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ProductEditScreen
