import os from 'os'
import jwt from 'jsonwebtoken'
import { JWTSECRET } from '../config/constant.config'

export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWTSECRET, { expiresIn: '7d' })
}

export const verifyToken = <T = any>(token: string): T => {
  return jwt.verify(token, JWTSECRET) as T
}

export const getLocalAdd = () => {
  {
    const interfaces = os.networkInterfaces()
    for (const name of Object.keys(interfaces)) {
      if (name == 'Wi-Fi')
        for (const net of interfaces[name]!) {
          if (net.family === 'IPv4' && !net.internal) {
            return `http://${net.address}`
          }
        }
    }
    return 'http://localhost'
  }
}
