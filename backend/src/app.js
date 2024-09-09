import express from 'express'
import morgan from 'morgan'
import roomsRouter from './api/rooms.js'
import bookingsRouter from './api/bookings.js'
import sequelize from './config/database.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/sync', async (req, res) => {
  // TODO remove this route
  await sequelize.sync({ force: true })
  res.status(204)
})

app.use('/api/v1/rooms', roomsRouter)
app.use('/api/v1/bookings', bookingsRouter)

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send('☠️☠️☠️ Something went wrong!')
})

export default app
