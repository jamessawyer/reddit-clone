import 'reflect-metadata'
import { DataSource } from 'typeorm'

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'reddit',
  synchronize: true,
  logging: true,
  entities: ['src/entity/*.ts'],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
})
