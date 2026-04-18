import { Router } from 'express'
import {
  getAboutContent,
  updateAboutContent,
} from '../controllers/aboutContentController.js'

const router = Router()

router.get('/', getAboutContent)
router.put('/', updateAboutContent)

export default router
