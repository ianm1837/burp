const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./connection');

const sessionInfo = {
  secret: process.env.COOKIE_SECRET,
  cookie: {
    maxAge: 86400000, //24 hours in milliseconds
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

module.exports = sessionInfo;
