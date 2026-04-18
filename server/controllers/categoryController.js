import Category from '../models/Category.js'

export async function getAllCategories(req, res) {
    try {
        const categories = await Category.find({ isActive: true }).sort({ name: 1 })
        res.json(categories)
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch categories',
            error: error.message,
        })
    }
}