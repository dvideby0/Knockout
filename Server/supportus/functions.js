var express = require('express')
var app = express.createServer();
var Mongolian = require("mongolian");
//var uuid = require('node-uuid');
var server = new Mongolian;
var db = server.db("knockoutDB");
var users = db.collection("users");

app.get('/supporters', function (req, res) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Max-Age", "3628800");

    supporters.getAll(function (data) {
        res.send(data);
    });


});

var supporters = {

    getAll: function(getAllCallBack) {

        users.find().toArray(function(err, data){

            for (var i = 0; i < data.length; i++) {
                data[i]._id = null;
            }

            getAllCallBack(data);

        });

    }

}


var creditUnionsJson = [
    {
        ClientId: "1",
        Name: "ABC Credit Union",
        FBUsers: [
            { Id: 1335106967 },
            { Id: 2244149 },
            { Id: 38508706 }
        ]
    }
];
var usersJson = [
    {
        Name: "JT Hope",
        Email: "jthope@gmail.com",
        Gender: "male",
        DOB: 488174400,
        FBUserId: 2244149,
        ClientId: 1,
        Date: 1350514559,
        AccessToken: "AAAFHDrQkwDUBAG3n7XnCi8XFywW8B9MAEDpmN6ZCUfU3nOZATeF3P31K6VtoJ8p7jdBJDXh0jvZBH88HnHLe2iYwkmwbGAZD"
    },
    {
        Name: "Nate Ogg",
        Email: "naogg@gmail.com",
        Gender: "male",
        DOB: 508174400,
        FBUserId: 38508706,
        ClientId: 1,
        Date: 1350514559,
        AccessToken: "AAAFHDrQkwDUBAG3n7XnCi8XFywW8B9MAEDpmN6ZCUfU3nOZATeF3P31K6VtoJ8p7jdBJDXh0jvZBH88HnHLe2iYwkmwbGAZD"
    },
    {
        AccessToken: "AAAFHDrQkwDUBAJZBH7nUdzza2KJIXk5JzGlcB744in8fxegJJOrsOS5Q8uaopEnQZAAG26Kq18A3CqkqCXU5RyotBMpLp9ZA69txIQihgZDZD",
        ClientId: 1,
        CommentsAvg: [
            0.08
        ],
        DOB: 433396800,
        Date: 1350529246,
        Email: "rbrookfield@yahoo.com",
        Gender: "male",
        FBUserId: 1335106967,
        LikesAvg: [
            0.23
        ],
        Location: [
            {
                Lat: 27.906142924118,
                Lon: -82.785370074997,
                Name: "Largo, Florida"
            }
        ],
        Name: "Rich Brookfield"
    }
];
var campaignsJson = [
    {
        Id: 1,
        Name: "Campaign 1",
        Message: "Test Campaign 1",
        FBUsers: [
            {
                Id: "1335106967"
            },
            {
                Id: "2244149"
            }
        ],
        Active: null
    },
    {
        Id: 2,
        Name: "Campaign 2",
        Message: "Test Campaign 2",
        FBUsers: [
            {
                Id: "1335106967"
            },
            {
                Id: "2244149"
            }
        ],
        Active: null
    },
    {
        Id: 3,
        Name: "Campaign 3",
        Message: "Test Campaign 3",
        FBUsers: [
            {
                Id: "1335106967"
            },
            {
                Id: "2244149"
            }
        ],
        Active: null
    }
];

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

app.listen(3838);