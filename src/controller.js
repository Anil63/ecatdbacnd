var MenRanking = require("./models/mens");

var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var jwt = require("jsonwebtoken");

var nodemailer = require('nodemailer');

var bcrypt = require("bcryptjs");

class class1 {

    static a = async (req, res) => {
        res.render("signup")
    }

    static b = async (req, res) => {

        try{
            await MenRanking.find({complete:"no"}).deleteMany();

        function between(min, max) {
            return Math.floor(
                Math.random() * (max - min) + min
            )
        }

        var otp = between(100000, 999999);

        var signuptoken = await jwt.sign({ username: req.body.username }, process.env.SECRET_KEY);

        res.cookie("signuptoken", signuptoken);

        var addingMensRecords = new MenRanking(
            {
                firstname: req.body.firstname,
                lastname:req.body.lastname,
                username:req.body.username,
                mobile:req.body.mobile,
                email:req.body.email,
                password:await bcrypt.hash(req.body.password, 12),
                confirmpassword:req.body.password,
                otp:otp,
                signuptoken:signuptoken,
                complete:"no"

            });

        await addingMensRecords.save();

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nikunjghpghari456@gmail.com',
                pass: 'svkadtefcqhtqryj'
            }
        });

        var mailOptions = {
            from: 'nikunjghpghari456@gmail.com',      // sender's gmail
            to: `${req.body.email}`,                  // receiver's gmail
            subject: 'one time otp',                  //subject
            text: `${otp}`                            //message Description
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
        });

        res.redirect(`/otp/${signuptoken}`);
        }catch(error){
            console.log(error)
        }

    }

    static c = async (req, res) => {

        try{
            await MenRanking.findOne({signuptoken:req.params._id1});
            res.render("otp")
        }catch(error){
            console.log(error)
        }
    }

    static d = async (req, res) => {

        try{

            var user = await MenRanking.findOne({signuptoken:req.cookies.signuptoken});

            if(req.body.otp == user.otp){
                var updateuser = await MenRanking.findOneAndUpdate({signuptoken:req.cookies.signuptoken},{$set:{complete:"yes"}});
                await updateuser.save();

                function between(min, max) {
                    return Math.floor(
                        Math.random() * (max - min) + min
                    )
                }
        
                var otp = between(100000, 999999);

                var updateuser = await MenRanking.findOneAndUpdate({signuptoken:req.cookies.signuptoken},{$set:{otp:otp}});
                await updateuser.save();

                res.render("login")

            }else{
                res.render("signup")
            }

        }catch(error){
            console.log(error);
        }
    }

    static e = async (req, res) => {
        res.render("login")
    }

    static f = async (req, res) => {

        try{
            var user = await MenRanking.findOne({username:req.body.username});

        if(await bcrypt.compare(req.body.password, user.password)){

        res.cookie("signuptoken", user.signuptoken)

        var logintoken = await jwt.sign({ username: req.body.username }, process.env.SECRET_KEY);
        res.cookie("logintoken", logintoken , {expires: new Date(Date.now()+300000)} )

            res.redirect('first');
        }else{
            res.redirect('login');
        }

        }catch(error){
            res.redirect('signup');
        }
    }

    static g = async (req, res) => {

        try{

            if(req.cookies.signuptoken){
                res.send("First");
            }else{
                res.redirect('login');
            }

        }catch(error){
            res.redirect('login');
        }

    }
}

module.exports = { class1 };