import express from 'express'
import morgan from 'morgan'

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send('☠️☠️☠️ Something went wrong!')
})

export default app
