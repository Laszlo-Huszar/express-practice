const express = require('express');
const passport = require('passport');
const router = express.Router();

const GoogleStrategy = require('passport-google-oidc');

const User = require('../models/user');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env['GOOGLE_CLIENT_ID'],
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
      callbackURL: '/oauth2/redirect/google',
      scope: ['openid', 'profile', 'email'],
    },
    async function verify(issuer, profile, cb) {
      console.log(profile);

      return cb(null, { id: 'template' });
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.get('/login/federated/google', passport.authenticate('google'));

router.get(
  '/oauth2/redirect/google',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.send('logout');
  });
});

router.get('/user', (req, res) => {
  console.log(req.user);

  res.send(req.user);
});

module.exports = router;
