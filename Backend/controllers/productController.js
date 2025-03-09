import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/Product.js'
const getAllProducts = asyncHandler(async (req, res) => {
  // Search by keyword (case-insensitive search)
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {}

  // Filters for category, subcategory, rating, stock, price, size, and color
  const filters = {
    ...keyword,
    ...(req.query.category ? { category: req.query.category } : {}),
    ...(req.query.subcategory ? { subcategory: req.query.subcategory } : {}),  // Added subcategory filter
    ...(req.query.rating ? { rating: { $gte: req.query.rating } } : {}),
    ...(req.query.inStock === 'true' ? { countInStock: { $gt: 0 } } : {}),
    ...(req.query.inStock === 'false' ? { countInStock: { $eq: 0 } } : {}),
    ...(req.query.minPrice ? { price: { $gte: req.query.minPrice } } : {}),
    ...(req.query.maxPrice ? { price: { $lte: req.query.maxPrice } } : {}),
    ...(req.query.size ? { sizes: { $in: req.query.size.split(',') } } : {}),
    ...(req.query.color ? { colors: { $in: req.query.color.split(',') } } : {}),
  }

  // Sorting logic
  let sortOptions = {}
  if (req.query.sortBy) {
    switch (req.query.sortBy) {
      case 'priceAsc':
        sortOptions = { price: 1 }
        break
      case 'priceDesc':
        sortOptions = { price: -1 }
        break
      case 'recent':
        sortOptions = { createdAt: -1 }
        break
      case 'popular':
        sortOptions = { rating: -1 } // Alternatively, you could use numReviews here
        break
      default:
        sortOptions = { rating: -1 }
        break
    }
  } else {
    // Default sorting by most recent products
    sortOptions = { createdAt: -1 }
  }

  // Find products based on filters and sort options
  const products = await Product.find(filters).sort(sortOptions)

  // If no products match the filters, send an empty array
  if (!products.length) {
    return res.json({ products: [] })
  }

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
    images: ['https://i.pinimg.com/474x/67/10/b8/6710b8a71d696dcf3e91b4cfba4bf089.jpg', 'https://i.pinimg.com/474x/a0/eb/6f/a0eb6f8698dc013ea602026effbc73f2.jpg'],
    brand: 'sample brand',
    category: 'clothing',
    subcategory: 'women',
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
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    const alreadyReview = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    )
    if (alreadyReview) {
      res.status(400)
      throw new Error('Product already reviewed')
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length
    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Resource not found')
  }
})
const deleteProductReview = asyncHandler(async (req, res) => {
  const productId = req.params.id
  const reviewId = req.params.reviewId

  const product = await Product.findById(productId)
  if (product) {
    const reviewIndex = product.reviews.findIndex(
      (review) => review._id.toString() === reviewId
    )
    if (reviewIndex !== -1) {
      // Check if the review belongs to the authenticated user
      if (
        product.reviews[reviewIndex].user.toString() !== req.user._id.toString()
      ) {
        res.status(401)
        throw new Error('You are not authorized to delete this review')
      }

      product.reviews.splice(reviewIndex, 1)
      product.numReviews = product.reviews.length
      if (product.numReviews > 0) {
        product.rating =
          product.reviews.reduce((acc, review) => acc + review.rating, 0) /
          product.reviews.length
      } else {
        product.rating = 0
      }
      await product.save()
      res.json({ message: 'Review deleted' })
    } else {
      res.status(404)
      throw new Error('Review not found')
    }
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
export {
  getAllProducts,
  getPorductsClothing,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  deleteProductReview,
}