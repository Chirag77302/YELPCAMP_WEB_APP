var express = require("express");
var router = express.Router();
var Camp = require("../models/campground");
var Comment = require("../models/comment");


router.get("/index/:id/comments/new", isLoggedIn, function(req,res){
    Camp.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground}); 
        }
    });
});


router.post("/index/:id/comments",isLoggedIn,function(req,res){
    Camp.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/index");
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log("error ---- hehehehe");
                    console.log(err);
                }else{

                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    res.redirect("/index/" + campground._id);
                }
            });
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