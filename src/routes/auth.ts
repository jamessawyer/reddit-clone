import { Router } from 'express'
import type { Request, Response } from 'express'
import { validate, ValidationError } from 'class-validator'
import AppDataSource from '../data-source'
import User from '../entity/User'

const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body

  try {
    // 1. 验证数据
    let errors: { [key: string]: string } | ValidationError[] = {}
    const emailUser = await AppDataSource.manager.findOneBy(User, { email })
    const usernameUser = await AppDataSource.manager.findOneBy(User, { username })

    if (emailUser) errors.email = '邮箱已被注册'
    if (usernameUser) errors.username = '用户名已被注册'

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors)
    }

    // 2. 创建 User
    const user = new User({ email, username, password })

    errors = (await validate(user)) as ValidationError[]
    if (errors.length > 0) {
      return res.status(400).json({ errors })
    }

    await user.save()
    // 3. 返回 User
    return res.json(user)
  } catch (error) {
    console.log(`register err: ${error}`)
    return res.status(500).json(error)
  }
}

const router = Router()

router.post('/register', register)

export default router
