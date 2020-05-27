require('dotenv').config();

module.exports = {

  development: {
    dialect: 'sqlite',
    storage: './database.sqlite3'
  },
  test: {
    dialect: 'sqlite',
    storage: './database.sqlite3'
  },
  production: {
    dialect: 'sqlite',
    storage: './database.sqlite3'
  }

};
/*
// change username
module.exports = {
  development: {
    username: 'frankukachukwu',
    password: '',
    database: 'road_rescue_dev',
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: 'frankukachukwu',
    password: '',
    database: 'road_rescue_dev',
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
}; */
