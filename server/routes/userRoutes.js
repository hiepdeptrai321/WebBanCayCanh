import { Router } from 'express'
import {
  getAllUsers,
  updateUserRole,
  updateUserStatus,
} from '../controllers/userController.js'

const router = Router()

router.get('/', getAllUsers)
router.patch('/:id/role', updateUserRole)
router.patch('/:id/status', updateUserStatus)

export default router
