require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "define": {
      timestamps: false
    },
  
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME_TEST,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "define": {
      timestamps: false
    },
  }
}
