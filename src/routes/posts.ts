import { Response, Router } from 'express'
import { TypedRequestBody } from '../utlis/types'
import Post from '../entity/Post'
import auth from '../middleware/auth'

type PostRequest = {
  title: string
  body: string
  sub: string
}

// 创建Post
const createPost = async (req: TypedRequestBody<PostRequest>, res: Response) => {
  const { title, body, sub } = req.body

  const { user } = res.locals

  if (title.trim() === '') {
    return res.status(400).json({ msg: '标题不能为空' })
  }

  try {
    const post = new Post({
      title,
      body,
      subName: sub,
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
