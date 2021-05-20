const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys.js') 
const User = require('../models/user-model')

passport.serializeUser((user,done) => {
    done(null,user.id)
});

// cookies sent from browser
passport.deserializeUser((user,done) => {
    User.findById(user).then((user) => {
        done(null,user)
    })

    console.log(user)
});

passport.use(
    new GoogleStrategy( 
        {
            callbackURL:'/auth/google/redirect',
            clientID:keys.google.clietnID,
            clientSecret:keys.google.clientSecret
        }, (accessToken,refreshToken,profile,done) => 
        {
            User.findOne({
                googleId:profile.id
            }).then((currentUser) => {

                if(!currentUser) {
                    new User({
                        username: profile.displayName,
                        googleId: profile.id
                    }).save().then((newUser) => {
                        done(null,newUser)
                    })
                    return;
                }

                done(null,currentUser)
                
            })

           
        }
    ))