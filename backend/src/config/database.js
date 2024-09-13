import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  },
)

try {
  await sequelize.authenticate()
  console.log('Connection has been established successfully.')
  console.log('host', process.env.DB_HOST)
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

export default sequelize
