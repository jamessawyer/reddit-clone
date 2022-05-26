import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import CommonEntity from './CommonEntity'
import Post from './Post'
import User from './User'

// 频道
@Entity('subs')
export default class Sub extends CommonEntity {
  constructor(sub: Partial<Sub>) {
    super()
    Object.assign(this, sub)
  }

  @Index()
  @Column({ unique: true })
  name: string

  @Column()
  title: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ nullable: true })
  imageUrn: string

  @Column({ nullable: true })
  bannerUrn: string

  // 多个subs属于某一个用户
  // @ManyToOne((_type) => User, (user) => user.sub)
  @ManyToOne((_type) => User)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User

  // 一个频道有多个Posts
  @OneToMany((_type) => Post, (post) => post.sub)
  posts: Post[]
}
