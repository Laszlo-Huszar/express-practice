const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { default: mongoose } = require('mongoose');

const app = express();

const authRouter = require('./routes/auth');

const User = require('./models/user');

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
  })
);

app.use(passport.authenticate('session'));

app.use('/', authRouter);

mongoose.connect(process.env['MONGODB_URI']);

app.listen(3000);
