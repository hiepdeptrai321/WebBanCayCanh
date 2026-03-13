import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Góc Xanh Shop API is running' })
})

async function startServer() {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

startServer()
