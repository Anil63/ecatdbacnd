var express = require("express");
var app = express();
var port = process.env.PORT || 4000 ;
require("./db/conn");
var path = require("path");
var ejs = require("ejs");
const cors= require('cors');

var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended:false})); 

var ejs_folder_path = path.join(__dirname,"../templates");
// console.log(ejs_folder_path);
app.set("view engine","ejs");
app.set("views", ejs_folder_path );

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(express.static("public"));

const router = require('./routers');
app.use('/', router);

app.get("/home",async (req,res)=>{
    res.send("this is home page");
});

app.use(express.json());
app.use(cors({
    origin:" http://localhost:3000"
}))    

app.listen(port , ()=>{ 
    console.log("okay");
});