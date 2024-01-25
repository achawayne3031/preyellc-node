export const config = {
  HOST: 'kandula.db.elephantsql.com',
  USER: 'tjhvscex',
  PASSWORD: '7nGkkBmc0ZuG5fL6i7U0Zr9pXKVAvGqS',
  DB: 'tjhvscex',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}

export const dialect = 'postgres'
