'use strict'
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express"

export const verifyToken = async (req: any, res: any, next: NextFunction) => {

  const headers = req.headers.authorization
  const accessToken = headers ? headers.split(' ')[1] : ''
  try {
    // console.log("accessToken::", accessToken)
    // verify token
    if (!accessToken) {
      return res.status(403).json({
        message: 'Không có quyền'
      })
    }
    const verify = jwt.verify(accessToken, process.env.SECRET_KEY as string)
    console.log("verify::", verify)
    req.user = verify;
    next();
  } catch (err: any) {
    return res.status(401).json({
      message: err.message
    }
    )
  }
}