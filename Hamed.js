const session = require('express-session');
const express = require("express");
const bodyParser = require("body-parser");
const urlParser = bodyParser.urlencoded({extended:true});
const app = express();
const rand = (Math.random() * 10) + 1

var sess;

app.use(urlParser);
app.use(session({secret:rand,saveUninitialized: true,resave: true}));
app.route('/signin',(req,res)=>{
    sess = req.session;
    sess.email = req.body.email;
    res.end("end");
})

