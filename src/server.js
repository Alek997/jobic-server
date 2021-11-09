import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import config from './config'
import { register, login, protect } from './utils/auth'
import { connect } from './utils/db'
import userRouter from './resources/user/user.router'
import jobRouter from './resources/job/job.router'
import jobAppRouter from './resources/jobApp/jobApp.router'
import categoryRouter from './resources/category/category.router'
import reviewRouter from './resources/review/review.router'
import notificationRouter from './resources/notification/notification.router'

const fs = require('fs')
const key = fs.readFileSync('./key.pem')
const cert = fs.readFileSync('./cert.pem')
const https = require('https')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, 'image-' + Date.now() + '.png')
  },
})

const upload = multer({ storage: storage }).single('image')

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.post('/register', register)
app.post('/login', login)

app.use(express.static('public'))

app.use('/api', protect)
app.use('/api/user', userRouter)
app.use('/api/job', jobRouter)
app.use('/api/jobApp', jobAppRouter)
app.use('/api/category', categoryRouter)
app.use('/api/review', reviewRouter)
app.use('/api/notification', notificationRouter)

app.post('/api/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.sendStatus(500)
    }

    res.send(`https://localhost:3001/${req.file?.filename}`)
  })
})

export const start = async () => {
  try {
    await connect()
    const server = https.createServer({ key: key, cert: cert }, app)

    // app.listen(config.port, () => {
    //   console.log(`REST API on http://localhost:${config.port}`)
    // })
    app.get('/', (req, res) => {
      res.send('this is an secure server')
    })
    server.listen(3001, () => {
      console.log('listening on 3001')
    })
  } catch (e) {
    console.error(e)
  }
}
