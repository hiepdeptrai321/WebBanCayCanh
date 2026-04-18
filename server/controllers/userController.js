import mongoose from 'mongoose'
import User from '../models/User.js'

function toRoleValue(role) {
  const normalizedRole = String(role || '').trim().toLowerCase()

  if (normalizedRole === 'admin') {
    return 'admin'
  }

  return 'customer'
}

function toStatusValue(status) {
  const normalizedStatus = String(status || '').trim().toLowerCase()

  if (normalizedStatus === 'locked' || normalizedStatus === 'blocked') {
    return 'blocked'
  }

  if (normalizedStatus === 'inactive') {
    return 'inactive'
  }

  return 'active'
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.find({}).select('-passwordHash').sort({ createdAt: -1 })
    res.json(users)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch users',
      error: error.message,
    })
  }
}

export async function updateUserRole(req, res) {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user id' })
  }

  try {
    const currentUser = await User.findById(id)

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    const nextRole = req.body?.role ? toRoleValue(req.body.role) : currentUser.role === 'admin' ? 'customer' : 'admin'

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        role: nextRole,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select('-passwordHash')

    res.json(updatedUser)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update user role',
      error: error.message,
    })
  }
}

export async function updateUserStatus(req, res) {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user id' })
  }

  try {
    const currentUser = await User.findById(id)

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    const nextStatus = req.body?.status
      ? toStatusValue(req.body.status)
      : currentUser.status === 'blocked'
        ? 'active'
        : 'blocked'

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        status: nextStatus,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select('-passwordHash')

    res.json(updatedUser)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update user status',
      error: error.message,
    })
  }
}
