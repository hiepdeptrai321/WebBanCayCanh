import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import BlogPost from '../models/BlogPost.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function extractObjectId(rawValue) {
	if (!rawValue) {
		return undefined
	}

	if (typeof rawValue === 'string' && mongoose.Types.ObjectId.isValid(rawValue)) {
		return rawValue
	}

	if (rawValue.$oid && mongoose.Types.ObjectId.isValid(rawValue.$oid)) {
		return rawValue.$oid
	}

	return undefined
}

function toSlug(text) {
	return String(text || '')
		.trim()
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
}

function normalizeBooleanStatus(value, fallback = false) {
	if (typeof value === 'boolean') {
		return value
	}

	if (typeof value === 'string') {
		const lowered = value.trim().toLowerCase()

		if (lowered === 'da xuat ban' || lowered === 'đã xuất bản' || lowered === 'published' || lowered === 'true') {
			return true
		}

		if (lowered === 'nhap' || lowered === 'nháp' || lowered === 'draft' || lowered === 'false') {
			return false
		}
	}

	return fallback
}

function toBlogPayload(rawPayload = {}, currentPost = null) {
	const title = String(rawPayload.title || currentPost?.title || '').trim()
	const slug = String(rawPayload.slug || '').trim() || toSlug(title)
	const fallbackPublished = currentPost?.isPublished ?? false
	const isPublished = normalizeBooleanStatus(rawPayload.isPublished ?? rawPayload.status, fallbackPublished)

	let publishedAt = rawPayload.publishedAt

	if (isPublished) {
		publishedAt = publishedAt || currentPost?.publishedAt || new Date()
	} else {
		publishedAt = null
	}

	const categoryInput = rawPayload.category || {}
	const authorInput = rawPayload.author || {}

	return {
		title,
		slug,
		category: {
			id: extractObjectId(categoryInput.id || rawPayload.categoryId) || undefined,
			name: String(categoryInput.name || rawPayload.categoryName || rawPayload.category || currentPost?.category?.name || 'Chưa phân loại').trim(),
		},
		author: {
			id: extractObjectId(authorInput.id || rawPayload.authorId) || undefined,
			name: String(authorInput.name || rawPayload.authorName || rawPayload.author || currentPost?.author?.name || 'Ban biên tập').trim(),
		},
		summary: String(rawPayload.summary || currentPost?.summary || '').trim(),
		content: String(rawPayload.content || currentPost?.content || '').trim(),
		thumbnail: String(rawPayload.thumbnail || currentPost?.thumbnail || '').trim(),
		tags: Array.isArray(rawPayload.tags)
			? rawPayload.tags.map((tag) => String(tag || '').trim()).filter(Boolean)
			: currentPost?.tags || [],
		viewCount: Number.isFinite(Number(rawPayload.viewCount))
			? Math.max(0, Number(rawPayload.viewCount))
			: currentPost?.viewCount || 0,
		isPublished,
		publishedAt,
	}
}

function normalizeSeedPost(rawPost) {
	return {
		_id: extractObjectId(rawPost._id),
		title: rawPost.title,
		slug: rawPost.slug,
		category: {
			id: extractObjectId(rawPost.category?.id),
			name: rawPost.category?.name || 'Chưa phân loại',
		},
		author: {
			id: extractObjectId(rawPost.author?.id),
			name: rawPost.author?.name || 'Ban biên tập',
		},
		summary: rawPost.summary || '',
		content: rawPost.content || '',
		thumbnail: rawPost.thumbnail || '',
		tags: Array.isArray(rawPost.tags) ? rawPost.tags : [],
		viewCount: Number(rawPost.viewCount || 0),
		isPublished: Boolean(rawPost.isPublished),
		publishedAt: rawPost.publishedAt?.$date
			? new Date(rawPost.publishedAt.$date)
			: rawPost.publishedAt,
	}
}

async function seedBlogPostsIfEmpty() {
	const existingCount = await BlogPost.countDocuments()
	if (existingCount > 0) {
		return 0
	}

	const jsonPath = path.join(__dirname, '../../database/json/blog_posts.json')
	const rawFile = fs.readFileSync(jsonPath, 'utf-8')
	const rawPosts = JSON.parse(rawFile)
	const normalizedPosts = rawPosts.map(normalizeSeedPost)

	const insertedPosts = await BlogPost.insertMany(normalizedPosts)
	return insertedPosts.length
}

export async function getAllBlogPosts(req, res) {
	try {
		await seedBlogPostsIfEmpty()

		const posts = await BlogPost.find({ isPublished: true })
			.sort({ publishedAt: -1, createdAt: -1 })
			.lean()

		res.json(posts)
	} catch (error) {
		res.status(500).json({
			message: 'Failed to fetch blog posts',
			error: error.message,
		})
	}
}

export async function getAllBlogPostsAdmin(req, res) {
	try {
		await seedBlogPostsIfEmpty()

		const posts = await BlogPost.find({}).sort({ publishedAt: -1, createdAt: -1 })
		res.json(posts)
	} catch (error) {
		res.status(500).json({
			message: 'Failed to fetch admin blog posts',
			error: error.message,
		})
	}
}

export async function getBlogPostBySlug(req, res) {
	const { slug } = req.params

	try {
		await seedBlogPostsIfEmpty()

		const post = await BlogPost.findOne({
			slug,
			isPublished: true,
		}).lean()

		if (!post) {
			return res.status(404).json({ message: 'Blog post not found' })
		}

		await BlogPost.findByIdAndUpdate(post._id, { $inc: { viewCount: 1 } })
		res.json(post)
	} catch (error) {
		res.status(500).json({
			message: 'Failed to fetch blog post',
			error: error.message,
		})
	}
}

export async function createBlogPost(req, res) {
	try {
		const payload = toBlogPayload(req.body)

		if (!payload.title) {
			return res.status(400).json({ message: 'Blog title is required.' })
		}

		if (!payload.slug) {
			return res.status(400).json({ message: 'Blog slug is required.' })
		}

		const createdPost = await BlogPost.create(payload)
		res.status(201).json(createdPost)
	} catch (error) {
		res.status(400).json({
			message: 'Failed to create blog post',
			error: error.message,
		})
	}
}

export async function updateBlogPost(req, res) {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ message: 'Invalid blog post id' })
	}

	try {
		const currentPost = await BlogPost.findById(id)

		if (!currentPost) {
			return res.status(404).json({ message: 'Blog post not found' })
		}

		const payload = toBlogPayload(req.body, currentPost)

		const updatedPost = await BlogPost.findByIdAndUpdate(id, payload, {
			new: true,
			runValidators: true,
		})

		res.json(updatedPost)
	} catch (error) {
		res.status(400).json({
			message: 'Failed to update blog post',
			error: error.message,
		})
	}
}

export async function updateBlogPostStatus(req, res) {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ message: 'Invalid blog post id' })
	}

	try {
		const currentPost = await BlogPost.findById(id)

		if (!currentPost) {
			return res.status(404).json({ message: 'Blog post not found' })
		}

		const shouldPublish =
			req.body?.isPublished === undefined
				? !currentPost.isPublished
				: normalizeBooleanStatus(req.body.isPublished, currentPost.isPublished)

		const updatedPost = await BlogPost.findByIdAndUpdate(
			id,
			{
				isPublished: shouldPublish,
				publishedAt: shouldPublish ? currentPost.publishedAt || new Date() : null,
			},
			{
				new: true,
				runValidators: true,
			}
		)

		res.json(updatedPost)
	} catch (error) {
		res.status(400).json({
			message: 'Failed to update blog post status',
			error: error.message,
		})
	}
}

export async function deleteBlogPost(req, res) {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ message: 'Invalid blog post id' })
	}

	try {
		const deletedPost = await BlogPost.findByIdAndDelete(id)

		if (!deletedPost) {
			return res.status(404).json({ message: 'Blog post not found' })
		}

		res.json({ message: 'Blog post deleted successfully' })
	} catch (error) {
		res.status(500).json({
			message: 'Failed to delete blog post',
			error: error.message,
		})
	}
}

export async function seedBlogPosts(req, res) {
	try {
		const shouldReset = req.query.reset === 'true'

		if (shouldReset) {
			await BlogPost.deleteMany({})
		}

		const insertedCount = await seedBlogPostsIfEmpty()
		const total = await BlogPost.countDocuments()

		res.json({
			message:
				insertedCount > 0
					? 'Blog posts seeded successfully'
					: 'Blog posts already exist',
			insertedCount,
			total,
		})
	} catch (error) {
		res.status(500).json({
			message: 'Failed to seed blog posts',
			error: error.message,
		})
	}
}
