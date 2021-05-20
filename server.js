const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup =  require('./config/passport-setup')
const mongoose = require('mongoose')
const keys  = require('./config/keys')
const app = express();

// set up view engine
app.set('view engine','ejs');

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

// create  home route
app.get('/',(req,res) => {
    res.render('home')
})

app.listen(2020,() => {
    console.log('app now listeing for requests on port 2020');
})