import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import config from './config'
import { register, login, protect } from './utils/auth'
import { connect } from './utils/db'
import userRouter from './resources/user/user.router'
import adRouter from './resources/ad/ad.router'
// import itemRouter from './resources/item/item.router'
// import listRouter from './resources/list/list.router'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.post('/register', register)
app.post('/login', login)

app.use('/api', protect)
app.use('/api/user', userRouter)
app.use('/api/ad', adRouter)

// app.use('/api/item', itemRouter)
// app.use('/api/list', listRouter)

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}
