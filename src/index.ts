import express from 'express'
import morgan from 'morgan'
import * as bodyParser from 'body-parser'
import trim from './middleware/trim'
import authRoutes from './routes/auth'
import AppDataSource from './data-source'

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'))

app.use(trim)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', authRoutes)

app.listen(4000, async () => {
  console.log('server is running on port 4000')

  try {
    await AppDataSource.initialize()
  } catch (err) {
    console.log('error while initializing data source', err)
  }
})
