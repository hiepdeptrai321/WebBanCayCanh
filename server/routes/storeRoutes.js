import { Router } from 'express'
import {
  createBranch,
  deleteBranch,
  getStoreProfile,
  updateBranch,
  updateStoreProfile,
} from '../controllers/storeController.js'

const router = Router()

router.get('/profile', getStoreProfile)
router.put('/:id', updateStoreProfile)
router.post('/:id/branches', createBranch)
router.put('/:id/branches/:branchId', updateBranch)
router.delete('/:id/branches/:branchId', deleteBranch)

export default router
