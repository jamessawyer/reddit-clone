import { Exclude, instanceToPlain } from 'class-transformer'
import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export default abstract class CommonEntity extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  toJSON() {
    return instanceToPlain(this)
  }
}
