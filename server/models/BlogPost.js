import mongoose from 'mongoose'

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    category: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
      name: { type: String, default: 'Chưa phân loại' },
    },
    author: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, default: 'Ban biên tập' },
    },
    summary: { type: String, default: '' },
    content: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    tags: [{ type: String }],
    viewCount: { type: Number, default: 0, min: 0 },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  {
    timestamps: true,
    collection: 'blog_posts',
  }
)

export default mongoose.model('BlogPost', blogPostSchema)
