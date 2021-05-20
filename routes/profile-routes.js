const router = require('express').Router();

const authCheck = (req,res,next) => {
    if(!req.user) {
        // if user is not logged in
        res.redirect('/auth/login')
    }

    next();
}

router.get('/',authCheck,(req,res) => {
    console.log(req,res)
    res.render('profile',{user:req.user})
    res.send('you are the logged in, this is your profile - ' + req.user.username)
});


module.exports = router;