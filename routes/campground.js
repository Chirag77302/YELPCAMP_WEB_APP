var express = require("express");
var router = express.Router();
var Camp = require("../models/campground");


router.get("/",function(req,res){
    res.render("landing"); 
});


router.get("/index",function(req,res){
   
    // console.log(req.user);
    Camp.find({},function(err,allcamps){
       if(err){
           console.log(err);
       }else{
            res.render("campgrounds/index",{campgrounds:allcamps});
       }
   });
   
});



router.get("/index/new", isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});


router.post("/index", isLoggedIn, function(req,res){

        var name = req.body.name;
        var image = req.body.image;
        var author = {
            id:req.user._id,
            username:req.user.username
        }
        var newcamp = {name:name , image:image , author:author};
        Camp.create(newcamp,function(err,newly){
                if(err){
                    console.log(err);
                }else{
                    res.redirect("/index");
                }
        });
    });



router.get("/index/:id",function(req,res){
  
    Camp.findById(req.params.id).populate("comments").exec(function(err,foundcampg){
            if(err){
                console.log(err);
            }else{
                // it is between shows and database and not app.js and shows like earlier(without db technique)
                res.render("campgrounds/shows",{index:foundcampg});
            }
    });
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;