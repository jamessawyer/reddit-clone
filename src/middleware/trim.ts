import type { NextFunction, Request, Response } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  const exceptions = ['password', 'confirmPassword'] // 对这些字段不做 trim

  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      if (
        req.body[key] &&
        typeof req.body[key] === 'string' &&
        !exceptions.includes(req.body[key])
      ) {
        req.body[key] = req.body[key].trim()
      }
    })
  }
  next()
}
