import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  CreateDateColumn,
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
  @Column({ unique: true })
  email: string

  @Index()
  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @CreateDateColumn()
  createAt: Date

  @CreateDateColumn()
  updateAt: Date
}
