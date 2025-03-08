import React, { useState, useEffect } from 'react'
import { useGetAllproductsQuery } from '../slices/productApiSlice'
import { Link } from 'react-router-dom'
import { FaTh, FaThList } from 'react-icons/fa'

const Shop = () => {
  const [keyword] = useState('')
  const [sortOption, setSortOption] = useState('')
  const [category, setCategory] = useState('')
  const [inStock, setInStock] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(100)
  const [rating, setRating] = useState('')
  const [selectedColors, setSelectedColors] = useState([]) // Changed to an array
  const [selectedSizes, setSelectedSizes] = useState([]) // Changed to an array
  const [isGrid2Row, setIsGrid2Row] = useState(true)

  const {
    data: productsData,
    error,
    isLoading,
  } = useGetAllproductsQuery({
    keyword,
    category,
    sortBy: sortOption,
    minPrice,
    maxPrice,
    inStock,
    rating,
    colors: selectedColors.join(','), // Filter by colors
    sizes: selectedSizes.join(','), // Filter by sizes
  })

  const products = productsData?.products || []

  // Extract unique colors and sizes from products
  const uniqueColors = [
    ...new Set(products.flatMap((product) => product.colors)),
  ]
  const uniqueSizes = [...new Set(products.flatMap((product) => product.sizes))]

  const inStockCount = products.filter(
    (product) => product.countInStock > 0
  ).length
  const outOfStockCount = products.filter(
    (product) => product.countInStock === 0
  ).length

  const handleColorChange = (colorOption) => {
    setSelectedColors((prev) =>
      prev.includes(colorOption)
        ? prev.filter((color) => color !== colorOption)
        : [...prev, colorOption]
    )
  }

  const handleSizeChange = (sizeOption) => {
    setSelectedSizes((prev) =>
      prev.includes(sizeOption)
        ? prev.filter((size) => size !== sizeOption)
        : [...prev, sizeOption]
    )
  }

  return (
    <div className='shop'>
      <div className='bg-shop'>
        <Link to={'/'}>Home</Link>
      </div>
      <div className='container-shop-one'>
        <div>
          <div className='shop-grid'>
            <article>
              <h3>Disponibilité</h3>
              <p>
                En stock : <span className='inStock-bg'>{inStockCount}</span>
              </p>
              <p>
                En rupture de stock :{' '}
                <span className='outStock-bg'>{outOfStockCount}</span>
              </p>
            </article>
          </div>
        </div>
        <div>
          <article>
            <h3>Afficher comme</h3>
            <button onClick={() => setIsGrid2Row(true)} className='grid-one'>
              <FaThList />
            </button>
            <button onClick={() => setIsGrid2Row(false)} className='grid-two'>
              <FaTh />
            </button>
          </article>
        </div>
        <div>
          <article>
            <label>
              Trier par :
              <select onChange={(e) => setSortOption(e.target.value)}>
                <option value=''>Défaut</option>
                <option value='priceAsc'>Prix : Croissant</option>
                <option value='priceDesc'>Prix : Décroissant</option>
                <option value='rating'>Les mieux notés</option>
              </select>
            </label>
          </article>
        </div>
      </div>
      <div className='container-shop'>
        <article>
          <h4>Filtrer par Prix</h4>
          <label>
            De $
            <input
              type='number'
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>
          <label>
            À $
            <input
              type='number'
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </label>
        </article>
        <article>
          <h4>Filtrer par Catégorie</h4>
          <label>
            Catégorie :
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value=''>Toutes les Catégories</option>
              <option value='clothing'>Vêtements</option>
              <option value='shoes'>Chaussures</option>
              <option value='accessory'>Accessoires</option>
              <option value='african'>African Custom</option>
            </select>
          </label>
        </article>

        <article>
          <h4>Filtrer par Évaluation</h4>
          <label>
            Évaluation Minimum :
            <select onChange={(e) => setRating(e.target.value)}>
              <option value=''>Toutes les Évaluations</option>
              <option value='1'>1 Étoile & Plus</option>
              <option value='2'>2 Étoiles & Plus</option>
              <option value='3'>3 Étoiles & Plus</option>
              <option value='4'>4 Étoiles & Plus</option>
              <option value='5'>5 Étoiles</option>
            </select>
          </label>
        </article>

        {/* Filtrer par Couleur */}
        <article className='color-filter'>
          <h4>Filtrer par Couleur</h4>
          <div className='color-options'>
            {uniqueColors.map((colorOption) => (
              <button
                key={colorOption}
                className={`color-btn ${
                  selectedColors.includes(colorOption) ? 'selected' : ''
                }`}
                style={{ backgroundColor: colorOption }}
                onClick={() => handleColorChange(colorOption)}
              >
                {selectedColors.includes(colorOption) && <span>✓</span>}
              </button>
            ))}
          </div>
        </article>

        {/* Filter by Size */}
        <article>
          <h4>Filtrer par Taille</h4>
          <div>
            {uniqueSizes.map((sizeOption) => (
              <button
                key={sizeOption}
                style={{
                  padding: '5px 10px',
                  margin: '5px',
                  border: selectedSizes.includes(sizeOption)
                    ? '2px solid #000'
                    : 'none',
                }}
                onClick={() => handleSizeChange(sizeOption)}
              >
                {sizeOption}
              </button>
            ))}
          </div>
        </article>

        <article>
          <h4>Produits</h4>

          <div
            className={`product-list ${
              isGrid2Row ? 'grid-2-row' : 'grid-3-row'
            }`}
          >
            {isLoading && <p>Loading products...</p>}
            {error && <p>Error loading products: {error.message}</p>}
            {products.map((product) => (
              <div key={product._id} className='product-item'>
                <Link to={`/product/${product._id}`}>
                  <img src={product.images[0]} alt={product.name} />
                  {product.images[1] && (
                    <img src={product.images[1]} alt={product.name} />
                  )}
                </Link>
                <h5>{product.name.substring(0, 25)}</h5>
                <p>Price: ${product.price}</p>
                <p>Rating: {product.rating} Stars</p>
                <p>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}

export default Shop
