import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const sequelize = new Sequelize('booking-app', process.env.POSTGRES_USER, '', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
})

await sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database & tables synced')
  })
  .catch(err => {
    console.error('Unable to sync database:', err)
  })

export default sequelize
