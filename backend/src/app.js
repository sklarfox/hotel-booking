import express from 'express'
import morgan from 'morgan'
import roomsRouter from './api/rooms.js'
import bookingsRouter from './api/bookings.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.use('/api/v1/rooms', roomsRouter)
app.use('/api/v1/bookings', bookingsRouter)

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send('☠️☠️☠️ Something went wrong!')
})

export default app
