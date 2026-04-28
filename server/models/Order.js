import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productName: { type: String, trim: true },
    productImage: { type: String, trim: true },
    unitPrice: { type: Number, min: 0, default: 0 },
    quantity: { type: Number, min: 1, default: 1 },
    subtotal: { type: Number, min: 0, default: 0 },
  },
  { _id: false }
)

const orderSchema = new mongoose.Schema(
  {
    orderCode: { type: String, trim: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    customerInfo: {
      fullName: { type: String, trim: true },
      phone: { type: String, trim: true },
      email: { type: String, trim: true },
    },
    shippingAddress: {
      recipientName: { type: String, trim: true },
      phone: { type: String, trim: true },
      province: { type: String, trim: true },
      district: { type: String, trim: true },
      ward: { type: String, trim: true },
      streetAddress: { type: String, trim: true },
    },
    items: { type: [orderItemSchema], default: [] },
    pricing: {
      subtotal: { type: Number, min: 0, default: 0 },
      shippingFee: { type: Number, min: 0, default: 0 },
      discountAmount: { type: Number, min: 0, default: 0 },
      totalAmount: { type: Number, min: 0, default: 0 },
    },
    totalPrice: { type: Number, min: 0, default: 0 },
    payment: {
      method: { type: String, trim: true, default: 'COD' },
      status: { type: String, trim: true, default: 'pending' },
      provider: { type: String, trim: true, default: null },
      bankCode: { type: String, trim: true, default: null },
      accountNumber: { type: String, trim: true, default: null },
      accountName: { type: String, trim: true, default: null },
      transferContent: { type: String, trim: true, default: null },
      qrUrl: { type: String, trim: true, default: null },
      transactionCode: { type: String, trim: true, default: null },
      paidAt: { type: Date, default: null },
      webhookPayload: { type: mongoose.Schema.Types.Mixed, default: null },
    },
    status: { type: String, default: 'pending_confirmation' },
    note: { type: String, default: '' },
    orderedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: 'orders',
  }
)

export default mongoose.model('Order', orderSchema)
