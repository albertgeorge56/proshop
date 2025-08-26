import { Router } from 'express'
import multer from 'multer'
import fs from 'fs'

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import path from 'path'

const UPLOAD_DIR = 'E:/proshop/uploads'

// Ensure upload folder exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true })
}

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'E:/proshop/uploads') // absolute path
  },
  filename: (_, file, cb) => {
    const fileparse = path.parse(file.originalname)
    cb(null, fileparse.name + '-' + Date.now() + '-' + fileparse.ext)
  }
})

const upload = multer({ storage })

const router = Router()

router.use(authMiddleware)

router.post('/', upload.single('image'), createProduct)
router.get('/', getProducts)
router.get('/:id', getProductById)
router.put('/:id', upload.single('image'), updateProduct)
router.delete('/:id', deleteProduct)

export default router
