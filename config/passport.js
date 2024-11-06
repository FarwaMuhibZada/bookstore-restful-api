const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Import your User model

// Configure Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback', // This must match the callback URL in your Google API Console
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          // If user does not exist, create a new user
          user = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            role: 'user', // Default role for Google OAuth users
          });
          await user.save();
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// Serialize user to the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

module.exports = passport;
