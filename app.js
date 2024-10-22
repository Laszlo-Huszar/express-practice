const express = require('express');
const session = require('express-session');
const passport = require('passport');

const authRouter = require('./routes/auth');

const app = express();

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store,
    // store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
  })
);

app.use(passport.authenticate('session'));

app.use('/', authRouter);

app.listen(3000);
