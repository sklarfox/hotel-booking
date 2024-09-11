import express from 'express'
import morgan from 'morgan'
import roomsRouter from './api/rooms.js'
import bookingsRouter from './api/bookings.js'
import sequelize from './config/database.js'
import cors from 'cors'
import { authHandler } from './middleware/authorization.js'

const app = express()
app.use(cors())

app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/sync', async (req, res) => {
  // TODO remove this route after development
  sequelize.sync({ force: true })
  res.status(204)
})

app.use('/api/v1/rooms', roomsRouter) // roomsRouter has some public endpoints, authHandler applied to all write ops
app.use(authHandler) // authHandler applies to all routes below this line
app.use('/api/v1/bookings', bookingsRouter)

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('☠️☠️☠️ Something went wrong! Please try again.')
})

export default app
