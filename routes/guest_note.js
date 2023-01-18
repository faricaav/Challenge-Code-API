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

//endpoint menampilkan semua data guest, method: GET, function: findAll()
app.get("/", async(req,res) => {
    let result = await guest.findAll({
        attributes: {
            include: ['name','note'],
            exclude: ['address','phone','id_guest','createdAt','updatedAt']
        }
    })
    res.json(result)
})

//endpoint untuk menampilkan data guest berdasarkan id
app.get("/:id", async(req, res) =>{
    await guest.findOne({ where: {id_guest: req.params.id}, 
        attributes: {
            include: ['name','note'],
            exclude: ['address','phone','id_guest','createdAt','updatedAt']
        }})
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

module.exports = app