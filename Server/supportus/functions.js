var express = require('express')
    , fb = require('facebook-js')
    , app = express.createServer(
        express.bodyParser()
        , express.cookieParser()
        , express.session({ secret: 'some secret' })
    );
var Mongolian = require("mongolian");
var uuid = require('node-uuid');
var server = new Mongolian;
var db = server.db("supportus");
var users = db.collection("users");
var usersfriends = db.collection("usersfriends");
app.use(express.bodyParser());
app.get('/fluffy', function (req, res) {
    res.send('Heldfsdfd');
});
app.listen(3838);