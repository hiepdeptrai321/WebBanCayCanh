import mongoose from 'mongoose'
import Category from '../models/Category.js'

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

function toCategoryPayload(payload = {}) {
    const nextName = String(payload.name || '').trim()
    const nextSlug = String(payload.slug || '').trim() || toSlug(nextName)

    return {
        name: nextName,
        slug: nextSlug,
        description: String(payload.description || '').trim(),
        productCount: Number.isFinite(Number(payload.productCount))
            ? Math.max(0, Number(payload.productCount))
            : 0,
        isActive: payload.isActive !== undefined ? Boolean(payload.isActive) : payload.status !== 'Tạm ẩn',
    }
}

export async function getAllCategories(req, res) {
    try {
        const includeInactive = req.query.includeInactive === 'true'
        const query = includeInactive ? {} : { isActive: true }
        const categories = await Category.find(query).sort({ name: 1 })
        res.json(categories)
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch categories',
            error: error.message,
        })
    }
}

export async function createCategory(req, res) {
    try {
        const payload = toCategoryPayload(req.body)

        if (!payload.name) {
            return res.status(400).json({ message: 'Category name is required' })
        }

        if (!payload.slug) {
            return res.status(400).json({ message: 'Category slug is required' })
        }

        const createdCategory = await Category.create(payload)
        res.status(201).json(createdCategory)
    } catch (error) {
        res.status(400).json({
            message: 'Failed to create category',
            error: error.message,
        })
    }
}

export async function updateCategory(req, res) {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid category id' })
    }

    try {
        const payload = toCategoryPayload(req.body)

        const updatedCategory = await Category.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        })

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' })
        }

        res.json(updatedCategory)
    } catch (error) {
        res.status(400).json({
            message: 'Failed to update category',
            error: error.message,
        })
    }
}

export async function deleteCategory(req, res) {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid category id' })
    }

    try {
        const deletedCategory = await Category.findByIdAndDelete(id)

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' })
        }

        res.json({ message: 'Category deleted successfully' })
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete category',
            error: error.message,
        })
    }
}