import { Sequelize } from 'sequelize-typescript'
import { config, dialect } from './config'
import User from '../entity/user'

export const AppSequelize = new Sequelize({
  database: config.DB,
  username: config.USER,
  password: config.PASSWORD,
  host: config.HOST,
  dialect: 'postgres',
  repositoryMode: true,
  ssl: true,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  models: [User],
})
