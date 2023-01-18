//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const model = require('../models/index');
const guest = model.guest

//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "Wedding"

//endpoint menampilkan semua data guest, method: GET, function: findAll()
app.get("/", auth, (req,res) => {
    guest.findAll()
        .then(result => {
            res.json({
                guest : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint untuk menampilkan data guest berdasarkan id
app.get("/:id", auth, (req, res) =>{
    guest.findOne({ where: {id_guest: req.params.id}})
    .then(result => {
        res.json({
            guest: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint untuk menyimpan data guest, METHOD: POST, function: create
app.post("/", (req,res) => {
    
    let data = {
        name : req.body.name,
        address : req.body.address,
        phone : req.body.phone,
        note : req.body.note
    }
    guest.create(data)
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
})

//endpoint mengupdate data guest, METHOD: PUT, function:update
app.put("/:id", (req,res) => {
    let param = {
        id_guest : req.params.id
    }
    let data = {
        name : req.body.name,
        address : req.body.address,
        phone : req.body.phone,
        note : req.body.note
    }
    guest.update(data, {where: param})
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

//endpoint menghapus data guest, METHOD: DELETE, function: destroy
app.delete("/:id", auth, (req,res) => {
    let param = {
        id_guest : req.params.id
    }
    guest.destroy({where: param})
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