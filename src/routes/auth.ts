import { Router } from 'express'
import type { Request, Response } from 'express'
import User from './../entity/User'

const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body

  try {
    // 1. 验证数据
    // 2. 创建 User
    const user = new User({ email, username, password })
    await user.save()
    // 3. 返回 User
    return res.json(user)
  } catch (error) {
    console.log('register err: ' + error)
    return res.status(500).json(error)
  }
}

const router = Router()

router.post('/register', register)

export default router
