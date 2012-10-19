var express = require('express')
var app = express.createServer();

var Mongolian = require("mongolian");
var uuid = require('node-uuid');
var server = new Mongolian;
var db = server.db("knockoutDB");
var users = db.collection("users");

app.get('/users', function (req, res) {

    var data = users.find({userId: "1335106967"});
    console.log("cameback");
    //users.findOne({userId: "1335106967"},function (err, data) {
    data.forEach(function (data1){
    res.send(data1.first_name+ data1.zipcode);
    });

});
app.listen(3738);