const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys.js') 
const User = require('../models/user-model')

passport.use(
    new GoogleStrategy( 
        {
            callbackURL:'/auth/google/redirect',
            clientID:keys.google.clietnID,
            clientSecret:keys.google.clientSecret
        }, (accessToken,refreshToken,profile,done) =>
        {
            console.log('passport callback function fired')
            console.log(profile)
            new User({
                username: profile.displayName,
                googleId: profile.id
            }).save().then((newUser) => {
                console.log('new User created: ' + newUser)
            })
        }
    ))