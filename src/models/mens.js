var mongoose = require("mongoose");
var express = require("express");
var validator = require("validator")

var menSchema = new mongoose.Schema({
    firstname:{
        type:String,
        trim : true ,
        required : true,
        uppercase: true 
    },
    lastname:{
        type:String,
        trim : true ,
        required : true,
        uppercase: true 
    },
    username:{
        type:String,
        unique:[true , "username already present"]
    },
    mobile:{
        type:Number,
        required : true
    },
    email:{
        type:String,
        trim : true ,
        required : true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new error("Email is not valid");
            }
        }
    },
    password:{
        type:String,
        trim : true ,
        required : true
    },
    confirmpassword:{
        type:String,
        trim : true ,
        required : true
    },
    complete:{
        type:String
    },
    otp:{
        type:Number
    },
    signuptoken:{
        type:String
    }

});

var MenRanking = new mongoose.model("MenRanking" , menSchema );

module.exports = MenRanking ;