import { IsEmail, Length } from 'class-validator'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('users')
export default class User extends BaseEntity {
  constructor(user: Partial<User>) {
    super()
    Object.assign(this, user)
  }

  @PrimaryGeneratedColumn()
  id: number

  @Index()
  @IsEmail({}, { message: '邮箱格式不正确' })
  @Column({ unique: true })
  email: string

  @Index()
  @Length(3, 255, { message: '用户名至少3个字符' })
  @Column({ unique: true })
  username: string

  @Length(6, 255, { message: '密码至少6个字符' })
  @Column()
  password: string

  @CreateDateColumn()
  createAt: Date

  @CreateDateColumn()
  updateAt: Date
}
