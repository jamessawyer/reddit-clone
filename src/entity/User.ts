import { IsEmail, Length } from 'class-validator'
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Exclude, instanceToPlain } from 'class-transformer'

@Entity('users')
export default class User extends BaseEntity {
  constructor(user: Partial<User>) {
    super()
    Object.assign(this, user)
  }

  @Exclude()
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

  @Exclude()
  @Length(6, 255, { message: '密码至少6个字符' })
  @Column()
  password: string

  @CreateDateColumn()
  createAt: Date

  @CreateDateColumn()
  updateAt: Date

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6)
  }

  toJSON() {
    return instanceToPlain(this)
  }
}
