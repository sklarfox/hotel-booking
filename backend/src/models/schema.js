import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

class Room extends Model {}

Room.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    beds: { type: DataTypes.INTEGER, allowNull: false },
    description: DataTypes.STRING,
  },
  { sequelize, modelName: 'room' },
)

class Booking extends Model {}

Booking.init(
  {
    clientEmail: { type: DataTypes.STRING, allowNull: false },
    checkInDate: { type: DataTypes.DATEONLY, allowNull: false },
    checkOutDate: { type: DataTypes.DATEONLY, allowNull: false },
  },
  { sequelize, modelName: 'booking' },
)

Room.hasMany(Booking, {
  onDelete: 'RESTRICT',
  foreignKey: { allowNull: false },
})
Booking.belongsTo(Room)

await sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database & tables synced')
  })
  .catch(err => {
    console.error('Unable to sync database:', err)
  })

export { Room, Booking }
