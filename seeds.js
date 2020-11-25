var mongoose = require("mongoose");
var Camp = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    {
        name:"site1", 
        image : "https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350"
    },

    {
        name:"site1", 
        image : "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350"
    },

    {
        name:"site1", 
        image : "https://images.pexels.com/photos/1239422/pexels-photo-1239422.jpeg?auto=compress&cs=tinysrgb&h=350"
    }
]


function seedDB(){
    
    Camp.remove({},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("removed all");
        }

        // CREATE A NEW DB
    data.forEach(function(seed){
        Camp.create(seed, function(err,data){
            if(err){
                console.log(err);
            }else{
                console.log("new created");

                    Comment.create(
                        {
                            text:"blah blah",
                            author:"chiragj"

                        },function(err,comment){
                        
                            if(err){
                                console.log(err);
                            }else{
                                data.comments.push(comment);
                                data.save();
                                console.log("new comment added");
                            }
                        });

                    }
                });
            });
        });
    }

module.exports = seedDB;