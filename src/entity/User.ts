import { IsEmail, Length } from 'class-validator'
import { BeforeInsert, Column, Entity, Index, OneToMany } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'
import CommonEntity from './CommonEntity'
import Post from './Post'

@Entity('users')
export default class User extends CommonEntity {
  constructor(user: Partial<User>) {
    super()
    Object.assign(this, user)
  }

  @Index()
  @IsEmail({}, { message: '邮箱格式不正确' })
  @Column({ unique: true })
  email: string

  @Index()
  @Length(3, 255, { message: '用户名至少3个字符' })
  @Column({ unique: true })
  username: string

  @Exclude()
  @Length(6, 255, { message: '密码至少6个字符' })
  @Column()
  password: string

  // 为了避免eslint循环依赖的问题 import/no-cycle 错误
  // https://stackoverflow.com/a/65124006/7185283
  @OneToMany((_type) => Post, (post) => post.user)
  // @OneToMany('Post', 'user')
  posts: Post[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6)
  }
}
