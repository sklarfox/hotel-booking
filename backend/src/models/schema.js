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
    client_email: { type: DataTypes.STRING, allowNull: false },
    check_in_date: { type: DataTypes.DATEONLY, allowNull: false },
    check_out_date: { type: DataTypes.DATEONLY, allowNull: false },
  },
  { sequelize, modelName: 'booking' },
)

Room.hasMany(Booking, {
  onDelete: 'RESTRICT',
  foreignKey: { allowNull: false },
})
Booking.belongsTo(Room)

export { Room, Booking }
