import mongoose from 'mongoose'
import app from './app'
import portfinder from 'portfinder'
import { MONGOURI } from './config/constant.config'

export async function startServer() {
  // await new Promise((resolve) => setTimeout(resolve, 10000))
  await mongoose.connect(MONGOURI)
  console.log('DB CONNECTED')
  const port = await portfinder.getPortPromise({ port: 3000 })
  app.listen(port, () => {
    console.log('SERVER STARTED')
  })
  return `http://localhost:${port}`
}
