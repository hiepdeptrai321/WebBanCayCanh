import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    name: { type: String, required: true, trim: true },
    slug: { type: String, trim: true },
    sku: { type: String, trim: true },
    shortDescription: { type: String },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    stockQuantity: { type: Number, default: 0, min: 0 },
    careInfo: {
      lightRequirement: String,
      waterRequirement: String,
      humidityRequirement: String,
      difficultyLevel: String,
    },
    dimensions: {
      heightCm: Number,
      potSizeCm: Number,
    },
    image: { type: String },
    images: [
      {
        url: { type: String },
        alt: { type: String },
        isPrimary: { type: Boolean, default: false },
      },
    ],
    attributes: [
      {
        name: String,
        value: String,
      },
    ],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model('Product', productSchema)
