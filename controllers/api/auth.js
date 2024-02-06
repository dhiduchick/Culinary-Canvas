const router = require('express').Router();

  //Creates the login route for auth
router.get('/login', function(req, res, next) {
  res.render('login');
});

  //Forms logout route
  router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
module.exports = router;