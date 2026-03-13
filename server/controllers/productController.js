import mongoose from 'mongoose'
import Product from '../models/Product.js'

export async function getAllProducts(req, res) {
  try {
    const limit = Number(req.query.limit) || 8
    const onlyFeatured = req.query.featured === 'true'
    const activeQuery = { isActive: { $ne: false } }
    let products = []

    if (onlyFeatured) {
      products = await Product.find({ ...activeQuery, isFeatured: true }).sort({ createdAt: -1 }).limit(limit)

      if (products.length === 0) {
        products = await Product.find(activeQuery).sort({ createdAt: -1 }).limit(limit)
      }
    } else {
      products = await Product.find(activeQuery).sort({ createdAt: -1 }).limit(limit)
    }

    res.json(products)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message })
  }
}

export async function getProductById(req, res) {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product id' })
  }

  try {
    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json(product)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error: error.message })
  }
}

export async function createProduct(req, res) {
  try {
    const createdProduct = await Product.create(req.body)
    res.status(201).json(createdProduct)
  } catch (error) {
    res.status(400).json({ message: 'Failed to create product', error: error.message })
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
    res.status(400).json({ message: 'Failed to update product', error: error.message })
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
    res.status(500).json({ message: 'Failed to delete product', error: error.message })
  }
}
