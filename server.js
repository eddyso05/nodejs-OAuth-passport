const express       = require('express');
const authRoutes    = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup =  require('./config/passport-setup')
const mongoose      = require('mongoose')
const keys          = require('./config/keys')
const cookieSession = require('cookie-session')
const passport      = require('passport')

const app = express();

// set up view engine
app.set('view engine','ejs');

app.use(cookieSession({ 
    maxAge: 24 * 60 * 1000,
    // encrypt the id from keys
    keys : [keys.session.cookieKey]
}))

// initialize passport 
app.use(passport.initialize())
app.use(passport.session())

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI,{
    useNewUrlParser : true,
    useCreateIndex  : true,
    useFindAndModify: false,
    useUnifiedTopology: true
},() => {
    console.log('connected to mongodb server')
});

// set up rotues
app.use('/auth',authRoutes)
app.use('/profile',profileRoutes)


// create  home route
app.get('/',(req,res) => {
    res.render('home')
})

app.listen(2020,() => {
    console.log('app now listeing for requests on port 2020');
})