import { Router } from 'express'
import {
  createInventoryLog,
  getAllInventoryLogs,
} from '../controllers/inventoryController.js'

const router = Router()

router.get('/', getAllInventoryLogs)
router.post('/', createInventoryLog)

export default router
