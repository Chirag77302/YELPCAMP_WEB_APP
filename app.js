var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localstratergy = require("passport-local");
var Camp = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");

var commentRoutes    = require("./routes/comment"),
    campgroundRoutes = require("./routes/campground"),
    indexRoutes      = require("./routes/auth")


mongoose.connect('mongodb://localhost:27017/yelpcamp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));


app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine" , "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

app.use(require("express-session")({
    secret:"I am Iron Man",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localstratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// THIS IS A UNIVERSAL FUNCTION WHICH WE WANT TO CHECK ON ALL THE ROUTES WE HAVE 
// METHOD FOR DECLARING A GLOBAL FUNCTION WHICH IS PASSED AUTOMATICALLY TO ALL THE ROUTES
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);



app.listen(3000,function(){
    console.log("server starts");
});
 