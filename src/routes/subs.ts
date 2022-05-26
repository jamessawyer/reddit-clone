import { isEmpty } from 'class-validator'
import { Request, Response, Router } from 'express'
import Sub from '../entity/Sub'
import auth from '../middleware/auth'
import AppDataSource from '../data-source'

// 创建频道
const createSub = async (req: Request, res: Response) => {
  const { name, title, description } = req.body

  const { user } = res.locals

  const errors: { [key: string]: string } = {}

  try {
    if (isEmpty(name)) {
      errors.name = '频道名不能为空'
    }
    if (isEmpty(title)) {
      errors.title = '频道标题不能为空'
    }

    // 查看频道是否存在
    const sub = await AppDataSource.manager
      .createQueryBuilder(Sub, 'sub')
      .where('lower(sub.name) = :name', { name: name.toLowerCase() })
      .getOne()

    if (sub) {
      errors.name = '频道已经存在'
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors)
    }
  } catch (err) {
    return res.status(400).json(err)
  }

  try {
    const sub = new Sub({ name, description, title, user })
    await sub.save()
    return res.status(201).json(sub)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: '服务端异常' })
  }
}

const router = Router()

router.post('/', [auth], createSub)

export default router
