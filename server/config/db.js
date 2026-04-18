import mongoose from 'mongoose'

async function connectDB() {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI

  if (!mongoUri) {
    console.error('Missing MongoDB connection string. Set MONGO_URI in server/.env')
    process.exit(1)
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    })
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error.message)
    process.exit(1)
  }
}

export default connectDB
