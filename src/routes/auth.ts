import { Request, Response, Router } from 'express'
import { isEmpty, validate, ValidationError } from 'class-validator'
import bcrypt from 'bcrypt'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import AppDataSource from '../data-source'
import User from '../entity/User'
import { TypedRequestBody } from '../utlis/types'
import auth from '../middleware/auth'

const register = async (req: TypedRequestBody<User>, res: Response) => {
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
    return res.status(500).json(error)
  }
}

const login = async (req: TypedRequestBody<User>, res: Response) => {
  const { username, password } = req.body

  const errors: { [key: string]: string } = {}

  if (isEmpty(username)) {
    errors.username = '用户名不能为空'
  }
  if (isEmpty(password)) {
    errors.password = '密码不能为空'
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors)
  }

  try {
    const user = await AppDataSource.manager.findOneBy(User, { username })
    if (!user) {
      return res.status(404).json({ error: '用户不存在' })
    }

    const passwordMatched = await bcrypt.compare(password, user.password)

    if (!passwordMatched) {
      return res.status(401).json({ error: '密码错误' })
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET)

    res.set(
      'Set-Cookie',
      cookie.serialize('token', token, {
        // https://www.npmjs.com/package/cookie#options
        httpOnly: process.env.NODE_ENV === 'production', // 如果为 true, 浏览器无法使用 document.cookie 访问 cookie
        secure: process.env.NODE_ENV === 'production', // 如果为true, 如果不是使用https连接，浏览器将不会发送cookie到服务器
        sameSite: 'strict', // 只能本site能使用
        maxAge: 1000 * 60 * 60 * 24 * 7, // 过期时间
        path: '/', // 表示所有路径都可以访问
      })
    )

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const me = async (req: Request, res: Response) => {
  return res.json(res.locals.user)
}

const logout = async (_: Request, res: Response) => {
  res.set(
    'Set-Cookie',
    cookie.serialize('token', '', {
      maxAge: 0,
      path: '/',
    })
  )
  return res.status(200).json({ message: '退出成功' })
}

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', [auth], me)
router.get('/logout', [auth], logout)

export default router
