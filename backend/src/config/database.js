import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const sequelize = new Sequelize('booking-app', process.env.POSTGRES_USER, '', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
})

export default sequelize
