import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/Product.js'
const getAllProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {}

  const filters = {
    ...keyword,
    ...(req.query.category ? { category: req.query.category } : {}),
    ...(req.query.rating ? { rating: { $gte: req.query.rating } } : {}),
    ...(req.query.inStock === 'true' ? { countInStock: { $gt: 0 } } : {}),
    ...(req.query.inStock === 'false' ? { countInStock: { $eq: 0 } } : {}),
    ...(req.query.minPrice ? { price: { $gte: req.query.minPrice } } : {}),
    ...(req.query.maxPrice ? { price: { $lte: req.query.maxPrice } } : {}),
    ...(req.query.size ? { sizes: { $in: req.query.size.split(',') } } : {}),
    ...(req.query.color ? { colors: { $in: req.query.color.split(',') } } : {}),
  }

  let sortOptions = {}
  if (req.query.sortBy) {
    sortOptions =
      req.query.sortBy === 'priceAsc'
        ? { price: 1 }
        : req.query.sortBy === 'priceDesc'
        ? { price: -1 }
        : req.query.sortBy === 'recent' // For sorting by most recent products
        ? { createdAt: -1 }
        : req.query.sortBy === 'popular' // Sort by rating or numReviews for popular products
        ? { rating: -1 } // Or you could use numReviews if you prefer
        : { rating: -1 }
  } else {
    sortOptions = { createdAt: -1 } // Default to sorting by most recent
  }

  const products = await Product.find(filters).sort(sortOptions)

  res.json({ products })
})

const getPorductsClothing = asyncHandler(async (req, res) => {
  const { subcategory } = req.query

  let query = { category: 'clothing' }

  if (subcategory) {
    query.subcategory = subcategory
  }

  const products = await Product.find(query).sort({ createdAt: -1 }) // Sort by the most recent

  res.json({ products })
})

const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    return res.json(product)
  }
  res.status(404)
  throw new Error('Resource not found')
})
// const createProduct = asyncHandler(async (req, res) => {
//   const {
//     name,
//     price,
//     description,
//     images,
//     brand,
//     category,
//     subcategory,
//     countInStock,
//     Oldprice, 
//     colors, 
//     sizes, 
//   } = req.body 

//   const product = await new Product({
//     name,
//     price,
//      user: req.user._id,
//     images,
//     brand,
//     category,
//     subcategory,
//     countInStock,
//     numReviews: 0, 
//     description,
//     Oldprice, 
//     colors, 
//     sizes, 
//   })

//   const createdProduct = await product.save()
//   res.status(201).json(createdProduct)
// })
const createProduct = asyncHandler(async (req, res) => {
  const product = await new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    images: ['/images/sample.jpg', '/images/sample.jpg'],
    brand: 'sample brand',
    category: 'sample category',
    subcategory: 'Kids',
    countInStock: 0,
    numReviews: 0,
    description: 'sample description',
    colors: ['Red', 'Blue'], // Add colors
    sizes: ['S', 'M', 'L'], // Add sizes
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})


const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    images,
    brand,
    category,
    subcategory,
    countInStock,
    Oldprice, // Added Oldprice
    colors, // Added colors
    sizes, // Added sizes
  } = req.body // Make sure these fields are coming from the client

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name || product.name
    product.price = price || product.price
    product.description = description || product.description
    product.images = images || product.images
    product.brand = brand || product.brand
    product.category = category || product.category
    product.subcategory = subcategory || product.subcategory
    product.countInStock = countInStock || product.countInStock
    product.Oldprice = Oldprice || product.Oldprice // Update Oldprice
    product.colors = colors || product.colors // Update colors
    product.sizes = sizes || product.sizes // Update sizes

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Resource not found')
  }
})
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await Product.deleteOne({ _id: product._id })
    res.status(200).json({ message: 'Product deleted' })
  } else {
    res.status(404)
    throw new Error('Resource not found')
  }
})

export {
  getAllProducts,
  getPorductsClothing,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
}