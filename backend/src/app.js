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

app.use(authHandler)
app.use('/api/v1/rooms', roomsRouter)
app.use('/api/v1/bookings', bookingsRouter)

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('☠️☠️☠️ Something went wrong! Please try again.')
})

export default app
