const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const db = require('../../models/db');
const callBackUrl = process.env.DYNO ? 'https://evening-reef-48573-57db96f3f837.herokuapp.com/oauth2/redirect/google': 'http://localhost:3001/oauth2/redirect/google'
//Sets up and uses passport for a new google Strategy authentication
passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: callBackUrl,
    //sets up a database table using sqlite3
  }, function verify(issuer, profile, done) {
    db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
      issuer,
      profile.id
    ], function(err, row) {
      if (err) { return cb(err); }
      if (!row) {
        db.run('INSERT INTO users (name) VALUES (?)', [
          profile.displayName
        ], function(err) {
          if (err) { return cb(err); }
  
          var id = this.lastID;
          db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
            id,
            issuer,
            profile.id
          ], function(err) {
            if (err) { return cb(err); }
            var user = {
              id: id,
              name: profile.displayName
            };
            return cb(null, user);
          });
        });
      } else {
        db.get('SELECT * FROM users WHERE id = ?', [ row.user_id ], function(err, row) {
          if (err) { return cb(err); }
          if (!row) { return cb(null, false); }
          return cb(null, row);
        });
      }
    });
    return done(err, profile)
  }));

  // The following steralizes the user
  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username, name: user.name });
    });
  });
  
  //This desteralizes the user
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

  //Creates the login route for auth
router.get('/login', function(req, res, next) {
  res.render('login');
});

//Creates route to google
router.get('/login/federated/google', passport.authenticate('google'));

//Creates Oauth route to redirect for authentication
router.get('/oauth2/redirect/google', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  //Forms logout route
  router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
module.exports = router;