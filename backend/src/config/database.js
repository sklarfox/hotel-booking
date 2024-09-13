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
console.log(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  typeof process.env.DB_HOST,
)

await sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database & tables synced')
  })
  .catch(err => {
    console.error('Unable to sync database:', err)
  })

export default sequelize
