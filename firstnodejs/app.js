const express               =  require('express'),
      app                   =  express(),
      path                  = require('path'),
      mongoose              =  require("mongoose"),
      passport              =  require("passport"),
      bodyParser            =  require("body-parser"),
      LocalStrategy         =  require("passport-local"),
      passportLocalMongoose =  require("passport-local-mongoose"),
      User                  =  require("./models/user");
      PORT                  =3000
 


mongoose.connect("mongodb://localhost/demo");

app.use(require("express-session")({
    secret:"sampritha",       
    resave: false,          
    saveUninitialized:false    
}));

passport.serializeUser(User.serializeUser());       
passport.deserializeUser(User.deserializeUser());   
passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));
app.use(express.static(path.join(__dirname, 'public')));

var index = require('./routes/login');
var quotes = require('./routes/quotes');
app.use('/', index);
app.use('/quotes', quotes);

app.listen(PORT,function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("Server Started At Port "+PORT);
    }
      
});