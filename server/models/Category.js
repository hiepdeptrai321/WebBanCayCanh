import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String, default: '' },
        productCount: { type: Number, default: 0, min: 0 },
        parentId: { type: mongoose.Schema.Types.ObjectId, default: null },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
)

const Category = mongoose.model('Category', categorySchema)

export default Category