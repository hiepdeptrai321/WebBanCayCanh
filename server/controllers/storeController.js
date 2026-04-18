import mongoose from 'mongoose'
import Store from '../models/Store.js'

function toSlug(text) {
  return String(text || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function generateBranchId() {
  return `branch-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

function toBranchPayload(branch = {}, currentBranchId = '') {
  return {
    id: String(currentBranchId || branch.id || generateBranchId()),
    name: String(branch.name || '').trim(),
    phone: String(branch.phone || '').trim(),
    province: String(branch.province || '').trim(),
    district: String(branch.district || '').trim(),
    ward: String(branch.ward || '').trim(),
    streetAddress: String(branch.streetAddress || '').trim(),
    openingHours: String(branch.openingHours || '').trim(),
    mapUrl: String(branch.mapUrl || '').trim(),
  }
}

async function getOrCreateStoreProfile() {
  let store = await Store.findOne({}).sort({ createdAt: 1 })

  if (!store) {
    store = await Store.create({
      name: 'Góc Xanh Shop',
      slug: 'goc-xanh-shop',
      description: 'Thông tin hệ thống cửa hàng chưa được cập nhật.',
      isActive: true,
      branches: [],
    })
  }

  const normalizedBranches = (store.branches || []).map((branch) => ({
    ...branch.toObject(),
    id: String(branch.id || generateBranchId()),
  }))

  const hasMissingBranchId = normalizedBranches.some((branch, index) => {
    const currentBranch = store.branches[index]
    return !currentBranch?.id || currentBranch.id !== branch.id
  })

  if (hasMissingBranchId) {
    store.branches = normalizedBranches
    await store.save()
  }

  return store
}

export async function getStoreProfile(req, res) {
  try {
    const store = await getOrCreateStoreProfile()
    res.json(store)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch store profile',
      error: error.message,
    })
  }
}

export async function updateStoreProfile(req, res) {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid store id' })
  }

  try {
    const payload = {
      name: String(req.body?.name || '').trim(),
      slug: String(req.body?.slug || '').trim() || toSlug(req.body?.name || ''),
      description: String(req.body?.description || '').trim(),
      isActive: req.body?.isActive !== undefined ? Boolean(req.body.isActive) : req.body?.status !== 'Tạm ẩn',
    }

    const updatedStore = await Store.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    })

    if (!updatedStore) {
      return res.status(404).json({ message: 'Store not found' })
    }

    res.json(updatedStore)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update store profile',
      error: error.message,
    })
  }
}

export async function createBranch(req, res) {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid store id' })
  }

  try {
    const store = await Store.findById(id)

    if (!store) {
      return res.status(404).json({ message: 'Store not found' })
    }

    const branchPayload = toBranchPayload(req.body)

    store.branches.unshift(branchPayload)
    await store.save()

    res.status(201).json(store)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create branch',
      error: error.message,
    })
  }
}

export async function updateBranch(req, res) {
  const { id, branchId } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid store id' })
  }

  try {
    const store = await Store.findById(id)

    if (!store) {
      return res.status(404).json({ message: 'Store not found' })
    }

    const branchIndex = store.branches.findIndex((branch) => branch.id === branchId)

    if (branchIndex === -1) {
      return res.status(404).json({ message: 'Branch not found' })
    }

    store.branches[branchIndex] = toBranchPayload(req.body, branchId)
    await store.save()

    res.json(store)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update branch',
      error: error.message,
    })
  }
}

export async function deleteBranch(req, res) {
  const { id, branchId } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid store id' })
  }

  try {
    const store = await Store.findById(id)

    if (!store) {
      return res.status(404).json({ message: 'Store not found' })
    }

    store.branches = store.branches.filter((branch) => branch.id !== branchId)
    await store.save()

    res.json(store)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete branch',
      error: error.message,
    })
  }
}
