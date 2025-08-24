import jwt from 'jsonwebtoken'
import { JWTSECRET } from '../config/constant.config'

export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWTSECRET, { expiresIn: '7d' })
}

export const verifyToken = <T = any>(token: string): T => {
  return jwt.verify(token, JWTSECRET) as T
}
