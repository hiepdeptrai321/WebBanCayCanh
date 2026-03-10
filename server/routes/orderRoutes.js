import { Router } from 'express'
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
} from '../controllers/orderController.js'

const router = Router()

router.get('/', getAllOrders)
router.get('/:id', getOrderById)
router.post('/', createOrder)
router.put('/:id', updateOrderStatus)

export default router
