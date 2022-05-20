import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import AppDataSource from '../data-source'
import User from '../entity/User'

export default async (req: Request, res: Response, next: NextFunction) => {
  const MSG = '没有权限，请先登录'
  try {
    const { token } = req.cookies
    if (!token) {
      throw new Error(MSG)
    }

    const { username }: any = jwt.verify(token, process.env.JWT_SECRET)

    const user = await AppDataSource.manager.findOneBy(User, { username })

    if (!user) {
      throw new Error(MSG)
    }

    res.locals.user = user

    return next()
  } catch (error) {
    return res.status(401).json({ msg: error.message })
  }
}
