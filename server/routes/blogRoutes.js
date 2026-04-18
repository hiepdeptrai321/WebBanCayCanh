import { Router } from 'express'
import {
	createBlogPost,
	deleteBlogPost,
	getAllBlogPosts,
	getAllBlogPostsAdmin,
	getBlogPostBySlug,
	seedBlogPosts,
	updateBlogPost,
	updateBlogPostStatus,
} from '../controllers/blogController.js'

const router = Router()

router.post('/seed', seedBlogPosts)
router.get('/admin/posts', getAllBlogPostsAdmin)
router.post('/admin/posts', createBlogPost)
router.put('/admin/posts/:id', updateBlogPost)
router.patch('/admin/posts/:id/status', updateBlogPostStatus)
router.delete('/admin/posts/:id', deleteBlogPost)
router.get('/', getAllBlogPosts)
router.get('/:slug', getBlogPostBySlug)

export default router

