import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser'
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import contactRoute from './routes/contactRoute.js'
import uploadRoute from './routes/uploadRoute.js'
import wishlistRoute from './routes/wishlistRoute.js'
import connectDB from './config/db.js'
dotenv.config()
connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const port = process.env.PORT || 5000
app.use('/api/products', productRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)
app.use('/api/form/contact', contactRoute)
app.use('/api/wishlist', wishlistRoute)
app.use(`/api/upload`, uploadRoute)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)
app.listen(port, () => console.log(`The server running at port ${port}`))
