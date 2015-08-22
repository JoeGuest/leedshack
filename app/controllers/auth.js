var express = require('express'),
  router = express.Router(),
  passport = require('passport');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/auth/steam', passport.authenticate('steam'));

router.get('/auth/steam/return', passport.authenticate('steam', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});