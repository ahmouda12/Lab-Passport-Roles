const passport       = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require('../models/user');
require("dotenv").config();

passport.serializeUser(function(user, cb) { cb(null, user); });
passport.deserializeUser(function(obj, cb) { cb(null, obj);  });

passport.use(new GitHubStrategy({
    clientID:     process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    const {
        id: githubId, 
        name, 
        login: username, 
        email, 
        avatar_url: avatar
    } 
    = profile._json;

    // if (profile._json.id)         { var githubId = profile._json.id; }
    // if (profile._json.name)       { var name     = profile._json.name; }
    // if (profile._json.login)      { var username = profile._json.login; }
    // if (profile._json.email)      { var email    = profile._json.email; }
    // if (profile._json.avatar_url) { var avatar   = profile._json.avatar_url; }

    const newUser = new User({
      token: accessToken,
      githubId,
      name,
      username,
      email,
      avatar
    });

    console.log('newUser', newUser);

    // User.findOrCreate(newUser, function (err, user) {
    //     return done(err, user);
    // });

    User.find({'githubId': githubId}, (err, userCheck)=> {
      if (err) { res.status(500).send('Something broke!') }
      if (!userCheck.length) {
          newUser.save(newUser, (err) => {
              return done(err, newUser);
          });
        }
      else {return done(err, newUser);}
  });
}
));

module.exports = passport;