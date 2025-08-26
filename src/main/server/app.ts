import express from 'express'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.route'
import companyRoutes from './routes/company.route'
import groupRoutes from './routes/group.route'
import productRoutes from './routes/product.route'
import swaggerRoutes from './routes/swagger.route'
import errorHandlerMiddleware from './middlewares/error.middleware'
import notFoundMiddleware from './middlewares/not-found.middleware'
import { getLocalAdd } from './utils/common.util'
import cors from 'cors'
import { join } from 'path'

const app = express()
const localAdd = getLocalAdd()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

if (process.env.NODE_ENV === 'production') {
  const reactPath = join(__dirname, '../../out/renderer')
  app.use(express.static(reactPath))
}
app.use('/api/local-ip', (_req, res) => {
  res.send(localAdd)
})
app.use('/api/auth', authRoutes)
app.use('/api/company', companyRoutes)
app.use('/api/group', groupRoutes)
app.use('/api/product', productRoutes)
app.use('/api-docs', swaggerRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

export default app
