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

//endpoint menampilkan semua data admin, method: GET, function: findAll()
app.get("/", auth, (req,res) => {
    admin.findAll()
        .then(result => {
            res.json({
                admin : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint untuk menampilkan data admin berdasarkan id
app.get("/:id", auth, (req, res) =>{
    admin.findOne({ where: {id_admin: req.params.id}})
    .then(result => {
        res.json({
            admin: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint untuk menyimpan data admin, METHOD: POST, function: create
app.post("/", async(req,res) => {
    let data = {
        name : req.body.name,
        password : md5(req.body.password)
    }

    const query = {
        username : req.body.username
    }

    const resultadmin = await admin.findOne({where: query})

    if(resultadmin){
        return res.json({message: "Username has been used"})
    } else {
        data.username = query.username 
        admin.create(data)
            .then(result => {
                res.json({
                    message: "data has been inserted"
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
    }
})

//endpoint mengupdate data admin, METHOD: PUT, function:update
app.put("/:id", auth, (req,res) => {
    let param = {
        id_admin : req.params.id
    }
    let data = {
        name : req.body.name,
        username : req.body.username,
        password : md5(req.body.password)
    }
    admin.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint menghapus data admin, METHOD: DELETE, function: destroy
app.delete("/:id", auth, (req,res) => {
    let param = {
        id_admin : req.params.id
    }
    admin.destroy({where: param})
        .then(result => {
            res.json({
                message: "data has been deleted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

module.exports = app