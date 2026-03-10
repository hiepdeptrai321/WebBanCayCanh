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

// Connect to database
connectDB()

// Routes
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Góc Xanh Shop API is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
