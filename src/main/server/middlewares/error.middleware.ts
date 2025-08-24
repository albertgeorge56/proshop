import { Request, Response, NextFunction } from 'express'
import z, { ZodError } from 'zod'

const errorHandlerMiddleware = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError)
    return res.status(400).json({
      success: false,
      message: 'Invalid Input',
      errors: z.flattenError(err).fieldErrors
    })
  return res
    .status(err.status || 500)
    .json({ success: false, message: err.message || 'Internal Server Error' })
}

export default errorHandlerMiddleware
