import mongoose from 'mongoose'

const inventoryLogSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    actionType: {
      type: String,
      enum: ['import', 'export', 'adjustment'],
      required: true,
    },
    quantityChanged: { type: Number, required: true },
    quantityBefore: { type: Number, required: true, min: 0 },
    quantityAfter: { type: Number, required: true, min: 0 },
    note: { type: String, trim: true, default: '' },
  },
  {
    timestamps: true,
    collection: 'inventory_logs',
  }
)

export default mongoose.model('InventoryLog', inventoryLogSchema)
