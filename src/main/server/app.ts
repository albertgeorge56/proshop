import express from 'express'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.route'
import companyRoutes from './routes/company.route'
import groupRoutes from './routes/group.route'
import productRoutes from './routes/product.route'
import swaggerRoutes from './routes/swagger.route'
import errorHandlerMiddleware from './middlewares/error.middleware'
import notFoundMiddleware from './middlewares/not-found.middleware'
import cors from 'cors'

const app = express()
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use('/api/check', (_, res) => {
  return res.json({ message: 'Hello from server' })
})
app.use('/api/auth', authRoutes)
app.use('/api/company', companyRoutes)
app.use('/api/group', groupRoutes)
app.use('/api/product', productRoutes)
app.use('/api-docs', swaggerRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

export default app
