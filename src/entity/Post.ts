import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { makeId, slugify } from '../utlis/helpers'
import CommonEntity from './CommonEntity'
import User from './User'

@Entity('posts')
export default class Post extends CommonEntity {
  constructor(post: Partial<Post>) {
    super()
    Object.assign(this, post)
  }

  @Index()
  @Column()
  identifier: string // 7字符id

  @Column({ comment: 'Post标题' })
  title: string

  @Index()
  @Column({ comment: 'Post' })
  slug: string

  @Column({ type: 'text', nullable: true, comment: 'Post内容' })
  body: string

  @Column({ comment: '频道名' })
  subName: string

  // 一个用户有多篇文章，一篇文章属于一个用户
  // 因此 Post -> User 是 `多对一` 的关系
  @ManyToOne((_type) => User, (user) => user.posts)
  // @ManyToOne('User', 'posts')
  // 设置 @JoinColumn 的一方，包含关系型id和对目标table的外键
  // referencedColumnName: 引用此列的实体中的列的名称
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeId(7)
    this.slug = slugify(this.title)
  }
}
