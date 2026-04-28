import { Router } from 'express'
import {
  getAllOrders,
  getOrderById,
  createOrder,
  getPaymentStatus,
  handleSepayWebhook,
  updateOrderStatus,
} from '../controllers/orderController.js'

const router = Router()

router.get('/', getAllOrders)
router.post('/sepay/webhook', handleSepayWebhook)
router.get('/:id/payment-status', getPaymentStatus)
router.get('/:id', getOrderById)
router.post('/', createOrder)
router.put('/:id', updateOrderStatus)

export default router
