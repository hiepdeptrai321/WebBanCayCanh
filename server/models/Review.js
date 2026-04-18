import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      fullName: { type: String, trim: true, default: 'Người dùng' },
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true, default: '' },
    isApproved: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: 'reviews',
  }
)

export default mongoose.model('Review', reviewSchema)
