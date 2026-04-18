import mongoose from 'mongoose'

const aboutContentSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      default: 'Về Hiệp Garden',
    },
    intro: {
      type: String,
      default:
        'Hiệp Garden là hệ thống cửa hàng cây cảnh chuyên cung cấp giải pháp xanh cho không gian sống và làm việc.',
    },
    mission: {
      type: String,
      default:
        'Mang cây xanh chất lượng và kiến thức chăm sóc cây đến gần hơn với mọi gia đình.',
    },
    vision: {
      type: String,
      default: 'Trở thành hệ sinh thái cây cảnh nội thất được tin dùng tại các thành phố lớn.',
    },
    contactEmail: {
      type: String,
      default: 'support@hiepgarden.vn',
    },
  },
  {
    timestamps: true,
    collection: 'about_content',
  }
)

export default mongoose.model('AboutContent', aboutContentSchema)
