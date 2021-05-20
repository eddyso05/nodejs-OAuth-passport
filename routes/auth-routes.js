const router = require('express').Router();
const passport = require('passport');

// auth login 
router.get('/login',(req,res) => {
    res.render('login');
})

// auth logout
router.get('/logout',(req,res) => {
    // handle with passport
    // res.send('log out with google')
    req.logout();
    res.redirect('/')
})

// auth with google
router.get('/google',passport.authenticate('google',{
    // what we want to retrieve from google
    scope:['profile']
}));

// call back for google to redirect to
router.get('/google/redirect',passport.authenticate('google'),(req,res) => {
    // res.send(req.user)
    res.redirect('/profile/')
});
 
module.exports = router;