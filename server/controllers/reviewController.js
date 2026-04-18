import mongoose from 'mongoose'
import Product from '../models/Product.js'
import Review from '../models/Review.js'

function toObjectId(value) {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  return value.toString()
}

async function enrichReviews(reviews) {
  const productIds = [...new Set(reviews.map((review) => toObjectId(review.productId)).filter(Boolean))]
  const products = await Product.find({ _id: { $in: productIds } }).select('name').lean()
  const productNameById = new Map(products.map((product) => [toObjectId(product._id), product.name || 'Sản phẩm']))

  return reviews.map((review) => ({
    ...review,
    productName: productNameById.get(toObjectId(review.productId)) || 'Sản phẩm',
  }))
}

export async function getAllReviews(req, res) {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 }).lean()
    const enrichedReviews = await enrichReviews(reviews)
    res.json(enrichedReviews)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch reviews',
      error: error.message,
    })
  }
}

export async function getReviewsByProduct(req, res) {
  const { productId } = req.params

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'Invalid product id' })
  }

  try {
    const reviews = await Review.find({
      productId,
      isApproved: true,
    })
      .sort({ createdAt: -1 })
      .lean()

    res.json(reviews)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch reviews by product',
      error: error.message,
    })
  }
}

export async function updateReviewStatus(req, res) {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid review id' })
  }

  try {
    const currentReview = await Review.findById(id)

    if (!currentReview) {
      return res.status(404).json({ message: 'Review not found' })
    }

    const nextApproval =
      req.body?.isApproved === undefined
        ? !currentReview.isApproved
        : Boolean(req.body.isApproved)

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      {
        isApproved: nextApproval,
      },
      {
        new: true,
        runValidators: true,
      }
    ).lean()

    const [enrichedReview] = await enrichReviews([updatedReview])
    res.json(enrichedReview)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update review status',
      error: error.message,
    })
  }
}

export async function deleteReview(req, res) {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid review id' })
  }

  try {
    const deletedReview = await Review.findByIdAndDelete(id)

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' })
    }

    res.json({ message: 'Review deleted successfully' })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete review',
      error: error.message,
    })
  }
}
