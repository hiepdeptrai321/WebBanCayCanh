import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import BlogPost from '../models/BlogPost.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function extractObjectId(rawValue) {
	if (!rawValue) return undefined
	if (typeof rawValue === 'string') return rawValue
	if (rawValue.$oid) return rawValue.$oid
	return undefined
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
