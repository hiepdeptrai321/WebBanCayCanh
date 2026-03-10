import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    items: { type: Array },
    totalPrice: { type: Number },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
)

export default mongoose.model('Order', orderSchema)
