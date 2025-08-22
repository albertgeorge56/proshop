import mongoose from 'mongoose'
import app from './app'
import portfinder from 'portfinder'

export async function startServer() {
  await mongoose.connect(
    'mongodb+srv://polus22:polusg123@cluster0.ttzigze.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster0'
  )
  console.log('DB CONNECTED')
  const port = await portfinder.getPortPromise({ port: 3000 })
  app.listen(port, () => {
    console.log('SERVER STARTED')
  })
  return `http://localhost:${port}`
}
