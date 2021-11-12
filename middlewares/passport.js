const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../db/models/Users");
const JWTStrategy = require('passport-jwt').Strategy; 
const { fromAuthHeaderAsBearerToken } = require('passport-jwt').ExtractJwt;
const { JWT_SECRET } = require("../config/keys");

exports.localStrategy = new LocalStrategy(async ( username, password, done ) => {
    try {
        const user = await User.findOne({ username: username });

        const passwordsMatch = user
        ? await bcrypt.compare(password, user.password)
        : false;

        if (passwordsMatch) return done(null, user);

        return done(null, false);
    } catch (error) {
        done(error);
    }

});

exports.jwtStrategy = new JWTStrategy({
    
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },

  async (payload, done) => {
    console.log("hi", payload);
    if (Date.now() > payload.exp) {
      return done(null, false);
    }
    try {
      const user = await User.findById(payload._id);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);