import { Request, Response, NextFunction } from 'express'

const notFoundMiddleware = (req: Request, res: Response, _next: NextFunction) => {
  return res.status(404).json({ success: false, message: `Not Found - ${req.originalUrl}` })
}

export default notFoundMiddleware
