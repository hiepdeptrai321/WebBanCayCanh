import AboutContent from '../models/AboutContent.js'

const defaultAboutContent = {
  heading: 'Về Hiệp Garden',
  intro:
    'Hiệp Garden là hệ thống cửa hàng cây cảnh chuyên cung cấp giải pháp xanh cho không gian sống và làm việc.',
  mission: 'Mang cây xanh chất lượng và kiến thức chăm sóc cây đến gần hơn với mọi gia đình.',
  vision: 'Trở thành hệ sinh thái cây cảnh nội thất được tin dùng tại các thành phố lớn.',
  contactEmail: 'support@hiepgarden.vn',
}

async function getOrCreateAboutContent() {
  let content = await AboutContent.findOne({}).sort({ createdAt: 1 })

  if (!content) {
    content = await AboutContent.create(defaultAboutContent)
  }

  return content
}

function normalizePayload(payload = {}) {
  return {
    heading: String(payload.heading || '').trim(),
    intro: String(payload.intro || '').trim(),
    mission: String(payload.mission || '').trim(),
    vision: String(payload.vision || '').trim(),
    contactEmail: String(payload.contactEmail || '').trim(),
  }
}

export async function getAboutContent(req, res) {
  try {
    const content = await getOrCreateAboutContent()
    res.json(content)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch about content',
      error: error.message,
    })
  }
}

export async function updateAboutContent(req, res) {
  try {
    const current = await getOrCreateAboutContent()
    const nextPayload = normalizePayload(req.body)

    const updatedContent = await AboutContent.findByIdAndUpdate(
      current._id,
      {
        ...nextPayload,
      },
      {
        new: true,
        runValidators: true,
      }
    )

    res.json(updatedContent)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update about content',
      error: error.message,
    })
  }
}
