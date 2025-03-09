import express from 'express'
import Wishlist from '../models/Wishlist.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// @desc    Add product to wishlist
// @route   POST /api/wishlist
// @access  Private
router.post('/', protect, async (req, res) => {
  const { productId } = req.body

  const wishlist = await Wishlist.findOne({ user: req.user._id })

  if (wishlist) {
    // Check if the product is already in the wishlist
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId)
      await wishlist.save()
    }
    return res.status(200).json(wishlist)
  } else {
    const newWishlist = await Wishlist.create({
      user: req.user._id,
      products: [productId],
    })
    return res.status(201).json(newWishlist)
  }
})

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
router.get('/', protect, async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
    'products'
  )

  if (!wishlist) {
    return res.status(404).json({ message: 'Wishlist not found' })
  }

  res.json(wishlist)
})

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
router.delete('/:productId', protect, async (req, res) => {
  const { productId } = req.params

  const wishlist = await Wishlist.findOne({ user: req.user._id })

  if (wishlist) {
    wishlist.products = wishlist.products.filter(
      (item) => item.toString() !== productId
    )
    await wishlist.save()
    return res.status(200).json(wishlist)
  } else {
    return res.status(404).json({ message: 'Wishlist not found' })
  }
})

export default router
