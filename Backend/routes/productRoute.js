import express from 'express'
import { createProduct, createProductReview, deleteProduct, deleteProductReview, getAllProducts, getPorductsClothing, getSingleProduct, updateProduct } from '../controllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()
router.route(`/`).get(getAllProducts)
router.route(`/clothing`).get(getPorductsClothing)
router
  .route(`/:id`)
  .get(getSingleProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)
router.route(`/`).post(protect, admin, createProduct)

router.route('/:id/reviews').post(protect, createProductReview)
router.delete('/:id/reviews/:reviewId', protect, deleteProductReview)
export default router
