const express = require('express');
const router = express.Router();
const passport = require('passport');

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
      const existingUser = await User.findOne(
        {
          issuer,
          id: profile.id,
        },
        '-_id id email'
      );

      if (!existingUser) {
        const newUser = new User({
          issuer,
          id: profile.id,
          email: profile.emails[0].value,
        });

        await newUser.save();

        return cb(null, {
          id: newUser.id,
          email: newUser.email,
        });
      }

      return cb(null, {
        id: existingUser.id,
        email: existingUser.email,
      });
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, email: user.email });
    // cb(null, { id: user.id, username: user.username, name: user.name });
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
    successRedirect: 'http://localhost:3001',
    failureRedirect: '/login',
  })
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.send('logout');
  });
});

router.get('/user', (req, res) => {
  console.log('user: ', req.user);

  res.json({ message: 'user' });
});

module.exports = router;
