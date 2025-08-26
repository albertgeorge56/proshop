import mongoose from 'mongoose'
import app from './app'
import { MONGOURI, PORT } from './config/constant.config'

export async function startServer() {
  await mongoose.connect(MONGOURI)
  console.log('DB CONNECTED')
  app.listen(PORT, '0.0.0.0', () => {
    console.log('SERVER STARTED')
  })
}
