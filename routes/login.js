//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const model = require('../models/index');
const admin = model.admin

//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "Wedding"

app.post("/", async (req,res) => {
    let data= {
        username: req.body.username,
        password: md5(req.body.password)
    }

    const resultAdmin = await admin.findOne({where: data})
    if (resultAdmin){
        let payload = JSON.stringify(resultAdmin)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: resultAdmin,
            token: token
        })
    } else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

module.exports = app