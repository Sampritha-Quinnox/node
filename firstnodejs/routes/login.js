var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport  =  require("passport")
var LocalStrategy =  require("passport-local")

router.get("/userprofile",isLoggedIn ,(req,res) =>{
    res.render('data', { title: 'GET QUOTES' });
    
})

router.get("/",(req,res)=>{
    res.render("login");
});

router.post("/",passport.authenticate("local",{
    successRedirect:"/userprofile",
    failureRedirect:"/"
    
}),function (req, res){

});

router.get("/register",(req,res)=>{
    res.render("register");
});

router.post("/register",(req,res)=>{
    
    User.register(new User({username: req.body.username,fullname:req.body.fullname,nationality: req.body.nationality,mobilenum: req.body.mobilenum}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.render("register");
        }
    passport.authenticate("local")(req,res,function(){
        res.redirect("/");
    })    
    })
})

router.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}


module.exports = router;