const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { default: mongoose } = require('mongoose');

const app = express();

const authRouter = require('./routes/auth');
const exerciseRouter = require('./routes/exercise');

const User = require('./models/user');
const MongoStore = require('connect-mongo');

app.use(express.json());

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
    store: MongoStore.create({
      mongoUrl: process.env['MONGODB_URI'],
    }),
  })
);

app.use(passport.authenticate('session'));

app.use('/', authRouter);
app.use('/', exerciseRouter);

mongoose.connect(process.env['MONGODB_URI']);

app.listen(3000);
