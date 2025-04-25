import jwt from 'jsonwebtoken'
import Types from 'mongoose'

type UserPayload = {
  id: Types.ObjectId
}

export const generateJWT = (payload: UserPayload) => {

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '180d'
  })
  return token
}