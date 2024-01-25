import {
  Model,
  Table,
  Column,
  DataType,
  UpdatedAt,
  PrimaryKey,
} from 'sequelize-typescript'

@Table({
  tableName: 'users',
  timestamps: true,
})
export default class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
  })
  id?: number

  @Column('text')
  full_name!: string

  @Column({
    unique: true,
  })
  email!: string

  @Column('text')
  password!: string

  @Column('text')
  username!: string

  @Column('text')
  otp!: string

  @Column('int')
  isVerified!: number

  @Column('text')
  createdAt!: string

  @Column('text')
  updatedAt!: string
}
