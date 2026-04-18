import mongoose from 'mongoose'

const branchSchema = new mongoose.Schema(
  {
    id: { type: String, trim: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    province: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    ward: { type: String, required: true, trim: true },
    streetAddress: { type: String, required: true, trim: true },
    openingHours: { type: String, required: true, trim: true },
    mapUrl: { type: String, trim: true, default: '' },
  },
  { _id: false }
)

const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    branches: { type: [branchSchema], default: [] },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: 'stores',
  }
)

export default mongoose.model('Store', storeSchema)
