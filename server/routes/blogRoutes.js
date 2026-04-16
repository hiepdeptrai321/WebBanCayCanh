import { Router } from 'express'
import {
	getAllBlogPosts,
	getBlogPostBySlug,
	seedBlogPosts,
} from '../controllers/blogController.js'

const router = Router()

router.post('/seed', seedBlogPosts)
router.get('/', getAllBlogPosts)
router.get('/:slug', getBlogPostBySlug)

export default router

