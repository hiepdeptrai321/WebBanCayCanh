import { Router } from 'express'
import {
  deleteReview,
  getAllReviews,
  getReviewsByProduct,
  updateReviewStatus,
} from '../controllers/reviewController.js'

const router = Router()

router.get('/', getAllReviews)
router.get('/product/:productId', getReviewsByProduct)
router.patch('/:id/status', updateReviewStatus)
router.delete('/:id', deleteReview)

export default router
