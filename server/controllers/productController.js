import mongoose from 'mongoose'
import Product from '../models/Product.js'

export async function getAllProducts(req, res) {
  try {
    const limitParam = Number(req.query.limit)
    const onlyFeatured = req.query.featured === 'true'
    const activeQuery = { isActive: { $ne: false } }

    let products = []

    if (onlyFeatured) {
      let featuredQuery = Product.find({
        ...activeQuery,
        isFeatured: true,
      }).sort({ createdAt: -1 })

      if (!Number.isNaN(limitParam) && limitParam > 0) {
        featuredQuery = featuredQuery.limit(limitParam)
      }

      products = await featuredQuery

      if (products.length === 0) {
        let fallbackQuery = Product.find(activeQuery).sort({ createdAt: -1 })

        if (!Number.isNaN(limitParam) && limitParam > 0) {
          fallbackQuery = fallbackQuery.limit(limitParam)
        }

        products = await fallbackQuery
      }
    } else {
      let normalQuery = Product.find(activeQuery).sort({ createdAt: -1 })

      if (!Number.isNaN(limitParam) && limitParam > 0) {
        normalQuery = normalQuery.limit(limitParam)
      }

      products = await normalQuery
    }

    res.json(products)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch products',
      error: error.message,
    })
  }
}

export async function getProductById(req, res) {
  const { id } = req.params

  try {
    let product = null

    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findOne({
        _id: id,
        isActive: { $ne: false },
      })
    }

    if (!product) {
      product = await Product.findOne({
        slug: id,
        isActive: { $ne: false },
      })
    }

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json(product)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch product',
      error: error.message,
    })
  }
}

export async function createProduct(req, res) {
  try {
    const createdProduct = await Product.create(req.body)
    res.status(201).json(createdProduct)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create product',
      error: error.message,
    })
  }
}

export async function updateProduct(req, res) {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product id' })
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json(updatedProduct)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update product',
      error: error.message,
    })
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product id' })
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id)

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete product',
      error: error.message,
    })
  }
}