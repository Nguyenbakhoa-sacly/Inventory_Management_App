
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import dotenv from "dotenv"
dotenv.config();

interface Payload {
  _id: Types.ObjectId;
  email: string;
  rule: number;
}

export const getAccessToken = async (payload: Payload) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY as string, {
    expiresIn: '1d', // 1 day
  })
  return token
}