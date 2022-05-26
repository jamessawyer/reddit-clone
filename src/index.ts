import express from 'express'
import morgan from 'morgan'
import * as bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import trim from './middleware/trim'
import authRoutes from './routes/auth'
import postRoutes from './routes/posts'
import subRoutes from './routes/subs'
import AppDataSource from './data-source'

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'))
// cookie-parser 用于解析 Cookie Header 并生成 req.cookies 对象
app.use(cookieParser())

app.use(trim)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/subs', subRoutes)

app.listen(process.env.PORT, async () => {
  console.log('server is running on port 4000')

  try {
    await AppDataSource.initialize()
  } catch (err) {
    console.log('error while initializing data source', err)
  }
})
