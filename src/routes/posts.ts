import { Response, Router } from 'express'
import { TypedRequestBody } from '../utlis/types'
import AppDataSource from '../data-source'
import Post from '../entity/Post'
import auth from '../middleware/auth'
import Sub from '../entity/Sub'

type PostRequest = {
  title: string // 标题
  body: string // 内容
  sub: string // 频道名
}

// 创建Post
const createPost = async (req: TypedRequestBody<PostRequest>, res: Response) => {
  const { title, body, sub } = req.body

  const { user } = res.locals

  if (title.trim() === '') {
    return res.status(400).json({ msg: '标题不能为空' })
  }

  try {
    // find sub
    const subRecord = await AppDataSource.manager.findOneOrFail(Sub, {
      where: { name: sub },
    })

    const post = new Post({
      title,
      body,
      sub: subRecord,
      user,
    })

    await post.save()

    return res.json(post)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: '服务器异常' })
  }
}

const router = Router()

router.post('/', [auth], createPost)

export default router
